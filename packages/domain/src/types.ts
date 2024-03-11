type TaskError = {
  code:
    | "SERVER_ERROR"
    | "ROLLBACK"
    | "NOT_FOUND"
    | "NOT_ALLOWED"
    | "FETCH_ERROR"
  message: string
}

export type TaskResult<TData> =
  | {
      success: true
      data: TData
    }
  | {
      success: false
      error: TaskError
    }

export type AsyncTaskResult<TData> = Promise<TaskResult<TData>>
