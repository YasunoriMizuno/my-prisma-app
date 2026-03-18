import { createTask } from './actions';

export default function CreateTaskPage() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">タスク新規作成</h2>
      
      {/* 💡 action に先ほど作った関数を指定するだけ！ */}
      <form action={createTask} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium">タイトル</label>
          <input
            name="title"
            type="text"
            required
            className="border p-2 w-full rounded"
            placeholder="例：牛乳を買う"
          />
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          保存する
        </button>
      </form>
    </div>
  );
}