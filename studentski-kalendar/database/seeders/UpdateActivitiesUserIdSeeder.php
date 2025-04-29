<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UpdateActivitiesUserIdSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Postavljen user_id na 1 za sve aktivnosti gde je user_id NULL
        DB::table('activities')->whereNull('user_id')->update(['user_id' => 1]);
    }
}
