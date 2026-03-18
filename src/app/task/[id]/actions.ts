'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/** タスク更新処理 */
export async function updateTask(formData: FormData) {
  const id = Number(formData.get('id')); // 数値に変換
  const title = formData.get('title') as string;
  const completed = formData.get('completed') === 'true'; // 文字列からブール値へ

  await prisma.todo.update({
    where: { id: id },
    data: {
      title: title,
      completed: completed,
    },
  });

  // データを最新にする
  revalidatePath('/task');
  revalidatePath(`/task/${id}`);
  
  // 更新後は一覧に戻る
  redirect('/task');
}

/** タスク削除処理（ついでに作っておきましょう！） */
export async function deleteTask(id: number) {
  await prisma.todo.delete({
    where: { id: id },
  });

  revalidatePath('/task');
  redirect('/task');
}