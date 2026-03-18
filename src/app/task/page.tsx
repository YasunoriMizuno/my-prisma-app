import PageTitle from '@/components/PageTitle';

/** タスクの型定義 */
type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  deadline: string;
};

/** ダミーデータ */
const DUMMY_TASKS: Task[] = [
  {
    id: '1',
    title: 'タスク1',
    description: 'Prismaのセットアップが完了しました！',
    status: '未着手',
    deadline: '2026-03-18',
  },
  {
    id: '2',
    title: 'タスク2',
    description: '次はServer Actionsを実装します。',
    status: '未着手',
    deadline: '2026-03-19',
  },
];

// タスク一覧画面
export default function TasksPage() {
  return (
    <>
      <PageTitle title="タスク一覧" />
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-2 w-full border-b border-blue-800 pb-2 font-bold">
          <p className="w-1/4">タイトル</p>
          <p className="w-1/2">詳細</p>
          <p className="w-1/8">ステータス</p>
          <p className="w-1/8">期限</p>
        </div>
        {DUMMY_TASKS.map((task) => (
          <div key={task.id} className="flex flex-row gap-2 w-full border-b border-blue-400 py-2 hover:bg-white/20 transition-colors">
            <p className="w-1/4 truncate">{task.title}</p>
            <p className="w-1/2 truncate">{task.description}</p>
            <p className="w-1/8">{task.status}</p>
            <p className="w-1/8">{task.deadline}</p>
          </div>
        ))}
      </div>
    </>
  );
}