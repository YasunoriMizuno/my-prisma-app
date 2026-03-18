import PageTitle from '@/components/PageTitle';
import { prisma } from '../../lib/prisma';

export default async function TaskListPage() {
  // 💡 データベース（Supabase）から全てのタスクを「新着順」で取ってくる
  const tasks = await prisma.todo.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <>
      <PageTitle title="タスク一覧" />
      <table className="w-full text-left border-collapse mt-4">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-2">タイトル</th>
            <th className="p-2">詳細</th>
            <th className="p-2">ステータス</th>
            <th className="p-2">期限</th>
          </tr>
        </thead>
        <tbody>
          {/* 💡 取ってきた本物のデータ（tasks）を1つずつ画面に並べる */}
          {tasks.map((task) => (
            <tr key={task.id} className="border-b hover:bg-gray-50">
              <td className="p-2 font-medium">{task.title}</td>
              <td className="p-2 text-gray-600">{task.description}</td>
              <td className="p-2 text-sm">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                  {task.status}
                </span>
              </td>
              <td className="p-2 text-gray-500">
                {/* 日付を見やすく変換 */}
                {new Date(task.deadline).toLocaleDateString('ja-JP')}
              </td>
            </tr>
          ))}
          {/* データが1件もない時の表示 */}
          {tasks.length === 0 && (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">
                タスクがありません。新しく作成しましょう！
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}