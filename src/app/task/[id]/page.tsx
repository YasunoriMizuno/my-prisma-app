import PageTitle from '@/components/PageTitle';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // URLからIDを取得
  const { id } = await params;

  // DBから1件だけ取得
  const task = await prisma.todo.findUnique({
    where: { id: Number(id) },
  });

  // タスクが見つからない場合は404画面へ
  if (!task) {
    notFound();
  }

  return (
    <div className="p-4">
      <PageTitle title="タスク詳細" />
      
      <div className="bg-white shadow rounded-lg p-6 max-w-2xl">
        <div className="mb-4">
          <label className="block text-gray-500 text-sm">タイトル</label>
          <p className="text-xl font-bold">{task.title}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-500 text-sm">ステータス</label>
          <p>
            <span className={`px-2 py-1 rounded-full text-xs ${
              task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {task.completed ? '完了' : '未完了'}
            </span>
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-500 text-sm">作成日</label>
          <p>{new Date(task.createdAt).toLocaleString('ja-JP')}</p>
        </div>

        <div className="flex gap-3">
          <Link 
            href="/task" 
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            戻る
          </Link>
          {/* ここに後で「編集ボタン」を追加します */}
        </div>
      </div>
    </div>
  );
}