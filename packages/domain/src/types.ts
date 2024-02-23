type TaskError = {
  code: "SERVER_ERROR" | "NOT_FOUND" | "NOT_ALLOWED"
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
