<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // Disable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Truncate the users table before seeding
        DB::table('users')->truncate();

        // Enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'unique_test@example.com', // Use a unique email address
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        // User::factory(10)->create();

        $this->call([
            NotificationSeeder::class,
            CalendarSeeder::class,
            CalendarViewSeeder::class,
            ActivitySeeder::class,
            ActivityCategorySeeder::class,
        ]);
    }
}
