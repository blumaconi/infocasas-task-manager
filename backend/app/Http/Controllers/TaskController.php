<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TaskController extends Controller
{
    // GET /api/tasks
    public function index(Request $request)
    {
        try {
            $query = Task::query();

            // Filter by name search
            if ($request->has('search')) {
                $search = strtolower($request->search);
                $query->whereRaw('LOWER(name) LIKE ?', ["%$search%"]);
            }

            // Filter by completed status
            if ($request->has('completed')) {
                $completed = filter_var($request->completed, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
                if (!is_null($completed)) {
                    $query->where('completed', $completed);
                }
            }

            // Get the filtered results
            $tasks = $query->get();

            return response()->json($tasks);
        } catch (QueryException $e) {
            return response()->json([
                'error' => 'Database connection error',
                'message' => 'Unable to retrieve tasks'
            ], 500);
        }
    }

    // POST /api/tasks
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
            ]);

            return Task::create([
                'name' => $request->name,
                'completed' => $request->completed ?? false,
            ]);
        } catch (QueryException $e) {
            return response()->json([
                'error' => 'Database connection error',
                'message' => 'Unable to create task'
            ], 500);
        }
    }

    // GET /api/tasks/{id}
    public function show($id)
    {
        try {
            return Task::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Task not found',
                'message' => 'The requested task does not exist'
            ], 404);
        } catch (QueryException $e) {
            return response()->json([
                'error' => 'Database connection error',
                'message' => 'Unable to retrieve task'
            ], 500);
        }
    }

    // PUT /api/tasks/{id}
    public function update(Request $request, $id)
    {
        try {
            $task = Task::findOrFail($id);

            $task->update([
                'name' => $request->name ?? $task->name,
                'completed' => $request->completed ?? $task->completed,
            ]);

            return $task;
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Task not found',
                'message' => 'The requested task does not exist'
            ], 404);
        } catch (QueryException $e) {
            return response()->json([
                'error' => 'Database connection error',
                'message' => 'Unable to update task'
            ], 500);
        }
    }

    // DELETE /api/tasks/{id}
    public function destroy($id)
    {
        try {
            $task = Task::findOrFail($id);
            $task->delete();

            return response()->json(['message' => 'Task deleted successfully']);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Task not found',
                'message' => 'The requested task does not exist'
            ], 404);
        } catch (QueryException $e) {
            return response()->json([
                'error' => 'Database connection error',
                'message' => 'Unable to delete task'
            ], 500);
        }
    }
}
