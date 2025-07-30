<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        Task::create(['name' => 'Do the laundry', 'completed' => true]);
        Task::create(['name' => 'Get gas', 'completed' => false]);
        Task::create(['name' => 'Clean the yard', 'completed' => false]);
        Task::create(['name' => 'Water the plants', 'completed' => true]);
        Task::create(['name' => 'Do the shopping', 'completed' => true]);
    }
}
