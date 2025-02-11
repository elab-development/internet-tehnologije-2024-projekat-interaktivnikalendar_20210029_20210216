<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CalendarView>
 */
class CalendarViewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'view_name' => $this->faker->randomElement(['Daily', 'Weekly', 'Monthly']),
            'date_from' => $this->faker->dateTimeThisMonth(),
            'date_to' => $this->faker->dateTimeThisMonth('+15 days'),
            'calendar_id' => \App\Models\Calendar::factory(),
        ];
    }
}
