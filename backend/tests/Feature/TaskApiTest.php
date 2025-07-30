<?php

namespace Tests\Feature;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_get_all_tasks()
    {
        Task::create(['name' => 'Test Task 1', 'completed' => false]);
        Task::create(['name' => 'Test Task 2', 'completed' => true]);

        $response = $this->getJson('/api/tasks');

        $response->assertStatus(200)
                ->assertJsonCount(2)
                ->assertJsonStructure([
                    '*' => ['id', 'name', 'completed', 'created_at', 'updated_at']
                ]);
    }

    public function test_can_create_task()
    {
        $taskData = ['name' => 'New Task'];

        $response = $this->postJson('/api/tasks', $taskData);

        $response->assertStatus(201)
                ->assertJson([
                    'name' => 'New Task',
                    'completed' => false
                ]);

        $this->assertDatabaseHas('tasks', $taskData);
    }

    public function test_can_create_task_with_completed_status()
    {
        $taskData = [
            'name' => 'Completed Task',
            'completed' => true
        ];

        $response = $this->postJson('/api/tasks', $taskData);

        $response->assertStatus(201)
                ->assertJson([
                    'name' => 'Completed Task',
                    'completed' => true
                ]);
    }

    public function test_cannot_create_task_without_name()
    {
        $response = $this->postJson('/api/tasks', []);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['name']);
    }

    public function test_can_get_specific_task()
    {
        $task = Task::create(['name' => 'Test Task', 'completed' => false]);

        $response = $this->getJson("/api/tasks/{$task->id}");

        $response->assertStatus(200)
                ->assertJson([
                    'id' => $task->id,
                    'name' => 'Test Task',
                    'completed' => false
                ]);
    }

    public function test_returns_404_for_nonexistent_task()
    {
        $response = $this->getJson('/api/tasks/999');

        $response->assertStatus(404);
    }

    public function test_can_update_task()
    {
        $task = Task::create(['name' => 'Original Task', 'completed' => false]);

        $updateData = [
            'name' => 'Updated Task',
            'completed' => true
        ];

        $response = $this->putJson("/api/tasks/{$task->id}", $updateData);

        $response->assertStatus(200)
                ->assertJson([
                    'id' => $task->id,
                    'name' => 'Updated Task',
                    'completed' => true
                ]);

        $this->assertDatabaseHas('tasks', $updateData);
    }

    public function test_can_update_task_partially()
    {
        $task = Task::create(['name' => 'Original Task', 'completed' => false]);

        $response = $this->putJson("/api/tasks/{$task->id}", ['completed' => true]);

        $response->assertStatus(200)
                ->assertJson([
                    'name' => 'Original Task',
                    'completed' => true
                ]);
    }

    public function test_can_delete_task()
    {
        $task = Task::create(['name' => 'Task to delete', 'completed' => false]);

        $response = $this->deleteJson("/api/tasks/{$task->id}");

        $response->assertStatus(200)
                ->assertJson(['message' => 'Task deleted successfully']);

        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }

    public function test_can_filter_tasks_by_completed_status()
    {
        Task::create(['name' => 'Task 1', 'completed' => false]);
        Task::create(['name' => 'Task 2', 'completed' => true]);
        Task::create(['name' => 'Task 3', 'completed' => false]);

        $response = $this->getJson('/api/tasks?completed=true');

        $response->assertStatus(200)
                ->assertJsonCount(1)
                ->assertJson([
                    ['name' => 'Task 2', 'completed' => true]
                ]);
    }

    public function test_can_filter_tasks_by_incomplete_status()
    {
        Task::create(['name' => 'Task 1', 'completed' => false]);
        Task::create(['name' => 'Task 2', 'completed' => true]);
        Task::create(['name' => 'Task 3', 'completed' => false]);

        $response = $this->getJson('/api/tasks?completed=false');

        $response->assertStatus(200)
                ->assertJsonCount(2);
    }

    public function test_can_search_tasks_by_name()
    {
        Task::create(['name' => 'Clean the yard', 'completed' => false]);
        Task::create(['name' => 'Do the laundry', 'completed' => true]);
        Task::create(['name' => 'Get gas', 'completed' => false]);

        $response = $this->getJson('/api/tasks?search=the');

        $response->assertStatus(200)
                ->assertJsonCount(2);
    }

    public function test_search_is_case_insensitive()
    {
        Task::create(['name' => 'BUY GROCERIES', 'completed' => false]);
        Task::create(['name' => 'Clean house', 'completed' => true]);

        $response = $this->getJson('/api/tasks?search=BUY');

        $response->assertStatus(200)
                ->assertJsonCount(1);
    }

    public function test_can_combine_search_and_filter()
    {
        Task::create(['name' => 'Buy groceries', 'completed' => false]);
        Task::create(['name' => 'Buy milk', 'completed' => true]);
        Task::create(['name' => 'Clean house', 'completed' => false]);

        $response = $this->getJson('/api/tasks?search=Buy&completed=true');

        $response->assertStatus(200)
                ->assertJsonCount(1)
                ->assertJson([
                    ['name' => 'Buy milk', 'completed' => true]
                ]);
    }
}
