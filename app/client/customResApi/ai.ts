import { post } from "@/app/request/client";

export async function getChatlist() {
  const data = await post("dialog/index", "");
  return data;
}
export async function createNewDialogId(title: string) {
  const data = await post("dialog/create", {
    title: title,
  });
  return data;
}
export async function deleteChat(id: number) {
  const data = await post("dialog/delete", {
    id: id,
  });
  return data;
}
export async function editChat(params: { id: number; title: string }) {
  const data = await post("dialog/update", params);
  return data;
}
export async function getChatMessage(id: number, title: string) {
  const data = await post("chat/index", {
    id: id,
  });
  return data;
}
