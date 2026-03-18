'use client'; 

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PageTitle from '@/components/PageTitle';
import Button from '@/components/Button';
import { updateTask, deleteTask } from './actions';

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [task, setTask] = useState<{ id: number; title: string; completed: boolean } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');

  // 画面が開いた時にデータを取ってくる
  useEffect(() => {
    fetch(`/api/task/${id}`)
      .then(res => res.json())
      .then(data => {
        setTask(data);
        setEditTitle(data.title);
      });
  }, [id]);

  if (!task) return <p className="p-4 text-gray-500">読み込み中...</p>;

  return (
    <div className="p-4">
      <PageTitle title={isEditing ? "タスクを編集" : "タスク詳細"} />

      <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl border border-gray-200">
        {isEditing ? (
          /* 📝 編集モード（フォームを表示） */
          <form action={updateTask} className="flex flex-col gap-4">
            <input type="hidden" name="id" value={task.id} />
            <div>
              <label className="block text-gray-600 text-sm mb-1 font-semibold">タイトル</label>
              <input
                name="title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full border-2 border-blue-100 p-2 rounded focus:border-blue-400 outline-none"
                required
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button type="submit">更新する</Button>
              <Button color="secondary" onClick={() => setIsEditing(false)}>キャンセル</Button>
            </div>
          </form>
        ) : (
          /* 🔍 表示モード */
          <>
            <div className="mb-6">
              <label className="block text-gray-500 text-sm mb-1">タイトル</label>
              <p className="text-xl font-bold text-gray-800">{task.title}</p>
            </div>
            <div className="flex gap-3">
              <Button color="secondary" onClick={() => setIsEditing(true)}>編集する</Button>
              <Button color="danger" onClick={async () => {
                if(confirm('このタスクを削除してもよろしいですか？')) {
                  await deleteTask(task.id);
                  router.push('/task'); // 削除したら一覧に戻る
                }
              }}>
                削除する
              </Button>
              <Button color="secondary" onClick={() => router.push('/task')}>戻る</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}