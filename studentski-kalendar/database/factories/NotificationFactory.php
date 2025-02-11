<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'content' => $this->faker->sentence(),
            'send_time' => $this->faker->dateTimeBetween('now', '+1 day'),
            'status' => $this->faker->boolean(),
            'activity_id' => \App\Models\Activity::factory(),
        ];
    }
}
