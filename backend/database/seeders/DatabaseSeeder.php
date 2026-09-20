<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;
use App\Models\BeanBagPrice;
use App\Models\Testimonial;
use App\Models\Article;
use App\Models\Service;
use App\Models\Client;
use App\Models\Setting;
use Illuminate\Support\Facades\File;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $jsonPath = base_path('../dataset_complete.json');
        if (!File::exists($jsonPath)) {
            $jsonPath = base_path('dataset_complete.json');
        }

        if (!File::exists($jsonPath)) {
            return;
        }

        $data = json_decode(File::get($jsonPath), true);

        // 1. Categories
        if (!empty($data['categories'])) {
            foreach ($data['categories'] as $cat) {
                Category::updateOrCreate(
                    ['slug' => $cat['slug']],
                    [
                        'name' => $cat['name'],
                        'description' => $cat['description'] ?? null,
                        'external_link' => $cat['external_link'] ?? null,
                        'sort_order' => $cat['sort_order'] ?? 0
                    ]
                );
            }
        }

        // 2. Products
        if (!empty($data['products'])) {
            $categoryMap = Category::pluck('id', 'slug')->toArray();
            foreach ($data['products'] as $p) {
                $catId = $categoryMap[$p['category_slug']] ?? (Category::first()->id ?? 1);
                Product::updateOrCreate(
                    ['slug' => $p['slug']],
                    [
                        'category_id' => $catId,
                        'category_slug' => $p['category_slug'],
                        'tag' => $p['tag'] ?? null,
                        'name' => $p['name'],
                        'image_url' => $p['image_url'],
                        'size' => $p['size'] ?? null,
                        'price' => $p['price'] ?? null,
                        'description' => $p['description'] ?? null,
                        'is_featured' => !empty($p['is_featured']),
                        'is_new' => !empty($p['is_new']),
                        'sort_order' => $p['sort_order'] ?? 0
                    ]
                );
            }
        }

        // 3. Bean Bag Prices
        if (!empty($data['beanBagPrices'])) {
            foreach ($data['beanBagPrices'] as $bb) {
                BeanBagPrice::updateOrCreate(
                    ['size_label' => $bb['size_label']],
                    [
                        'dimensions' => $bb['dimensions'] ?? null,
                        'material' => $bb['material'] ?? null,
                        'price' => $bb['price'],
                        'is_popular' => !empty($bb['is_popular'])
                    ]
                );
            }
        }

        // 4. Testimonials
        if (!empty($data['testimonials'])) {
            foreach ($data['testimonials'] as $t) {
                Testimonial::updateOrCreate(
                    ['name' => $t['name']],
                    [
                        'role' => $t['role'] ?? null,
                        'company' => $t['company'] ?? null,
                        'avatar' => $t['avatar'] ?? null,
                        'quote' => $t['quote'],
                        'rating' => $t['rating'] ?? 5
                    ]
                );
            }
        }

        // 5. Articles
        if (!empty($data['articles'])) {
            foreach ($data['articles'] as $a) {
                Article::updateOrCreate(
                    ['slug' => $a['slug']],
                    [
                        'title' => $a['title'],
                        'original_url' => $a['original_url'] ?? null,
                        'cover_image' => $a['cover_image'] ?? null,
                        'date_formatted' => $a['date_formatted'] ?? null,
                        'excerpt' => $a['excerpt'] ?? null,
                        'content' => $a['content'] ?? null,
                        'author' => $a['author'] ?? 'Bonekaku Admin',
                        'status' => $a['status'] ?? 'published'
                    ]
                );
            }
        }

        // 6. Services
        if (!empty($data['services'])) {
            foreach ($data['services'] as $s) {
                Service::updateOrCreate(
                    ['slug' => $s['slug']],
                    [
                        'title' => $s['title'],
                        'description' => $s['description'] ?? null,
                        'icon' => $s['icon'] ?? null,
                        'image_url' => $s['image_url'] ?? null,
                        'sort_order' => $s['id'] ?? 0
                    ]
                );
            }
        }

        // 7. Clients
        if (!empty($data['clients'])) {
            foreach ($data['clients'] as $c) {
                Client::updateOrCreate(
                    ['name' => $c['name']],
                    [
                        'logo_url' => $c['logo_url'],
                        'sort_order' => $c['id'] ?? 0
                    ]
                );
            }
        }

        // 8. Settings
        if (!empty($data['settings'])) {
            foreach ($data['settings'] as $k => $v) {
                Setting::updateOrCreate(
                    ['key' => $k],
                    ['value' => is_array($v) ? json_encode($v) : (string)$v]
                );
            }
        }

        // 9. Article Comments
        if (!empty($data['articleComments'])) {
            foreach ($data['articleComments'] as $ac) {
                \App\Models\ArticleComment::updateOrCreate(
                    ['id' => $ac['id']],
                    [
                        'article_slug' => $ac['article_slug'],
                        'name' => $ac['name'],
                        'email_or_url' => $ac['email_or_url'] ?? null,
                        'comment' => $ac['comment'],
                        'is_admin' => !empty($ac['is_admin'])
                    ]
                );
            }
        }
    }
}
