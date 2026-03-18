import PageTitle from '@/components/PageTitle';
import { prisma } from '../../lib/prisma';
import Link from 'next/link';

export default async function TaskListPage() {
  // 💡 データベース（Supabase）から全てのタスクを「新着順」で取ってくる
  const tasks = await prisma.todo.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <PageTitle title="タスク一覧" />
        {/* 💡 作成画面へのリンクを追加しました */}
        <Link 
          href="/task/create" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          新規作成
        </Link>
      </div>

      <table className="w-full text-left border-collapse mt-4">
        <thead>
          <tr className="border-b bg-gray-50 text-sm">
            <th className="p-2">タイトル</th>
            <th className="p-2 text-center">ステータス</th>
            <th className="p-2 text-right">作成日</th>
          </tr>
        </thead>
        <tbody>
          {/* 💡 DBにある項目（title, completed, createdAt）だけで表示 */}
          {tasks.map((task) => (
            <tr key={task.id} className="border-b hover:bg-gray-50 text-sm">
              <td className="p-2 font-medium">
  <Link href={`/task/${task.id}`} className="text-blue-600 hover:underline">
    {task.title}
  </Link>
</td>

              <td className="p-2 text-center">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  task.completed 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {task.completed ? '完了' : '未完了'}
                </span>
              </td>
              <td className="p-2 text-right text-gray-500">
                {new Date(task.createdAt).toLocaleDateString('ja-JP')}
              </td>
            </tr>
          ))}
          
          {/* データが1件もない時の表示 */}
          {tasks.length === 0 && (
            <tr>
              <td colSpan={3} className="p-8 text-center text-gray-500">
                タスクがありません。右上のボタンから作成しましょう！
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}