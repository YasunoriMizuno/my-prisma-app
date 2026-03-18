'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createTask(formData: FormData) {
  // 1. フォームから値を取得
  const title = formData.get('title') as string;

  // 2. データベース（Todoテーブル）に保存
  // 💡 今のDBには description がないので title だけ保存します
  await prisma.todo.create({
    data: {
      title: title,
      completed: false, // デフォルト値
    },
  });

  // 3. データのキャッシュを更新（一覧画面に反映させるため）
  revalidatePath('/task');

  // 4. 一覧画面へ戻る
  redirect('/task');
}