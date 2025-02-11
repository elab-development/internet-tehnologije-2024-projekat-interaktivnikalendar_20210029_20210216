<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Activity>
 */
class ActivityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $start = $this->faker->dateTimeThisMonth(); // Definisanje start_date
        return [
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'start_date' => $start,
            'end_date' => $this->faker->dateTimeBetween($start, '+3 hours'),
            'category_id' => \App\Models\ActivityCategory::factory(),
            'calendar_id' => \App\Models\Calendar::factory(),
        ];
    }
}
