import DeleteIcon from "../icons/delete.svg";
import BotIcon from "../icons/bot.svg";

import styles from "./home.module.scss";
import {
  DragDropContext,
  Droppable,
  Draggable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";

import { useChatStore } from "../store";
import { createSessionByid } from "@/app/store/chat";
import Locale from "../locales";
import { Link, useNavigate } from "react-router-dom";
import { Path } from "../constant";
import { MaskAvatar } from "./mask";
import { Mask } from "../store/mask";
import { useRef, useEffect, useState, useMemo } from "react";
import { showConfirm } from "./ui-lib";
import { deleteChat, getChatlist } from "../client/customResApi/ai";
import { getSession } from "../utils/api";
import { IResponse } from "../types/api";
type ChatList = {
  id: number;
  title: string;
};
export function ChatItem(props: {
  onClick?: () => void;
  onDelete?: () => void;
  title: string;
  selected: boolean;
  id: string;
  index: number;
  narrow?: boolean;
}) {
  const draggableRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (props.selected && draggableRef.current) {
      draggableRef.current?.scrollIntoView({
        block: "center",
      });
    }
  }, [props.selected]);
  return (
    <Draggable draggableId={`${props.id}`} index={props.index}>
      {(provided) => (
        <div
          className={`${styles["chat-item"]} ${
            props.selected && styles["chat-item-selected"]
          }`}
          onClick={props.onClick}
          ref={(ele) => {
            draggableRef.current = ele;
            provided.innerRef(ele);
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {props.narrow ? (
            <div className={styles["chat-item-narrow"]}></div>
          ) : (
            <>
              <div className={styles["chat-item-title"]}>{props.title}</div>
              <div className={styles["chat-item-info"]}></div>
            </>
          )}

          <div
            className={styles["chat-item-delete"]}
            onClickCapture={props.onDelete}
          >
            <DeleteIcon />
          </div>
        </div>
      )}
    </Draggable>
  );
}

export function ChatList(props: { narrow?: boolean }) {
  const data = useChatStore().sessions;
  const removeAllSessions = useChatStore().clearSessions;
  const setSessions = useChatStore().setSessions;
  const sessions = useChatStore().sessions;

  //if localstorage session length under the serve session,set the localStorage session to zero and then set the sessions  from serve

  useEffect(() => {
    const data = async () => {
      const data = await getChatlist();
      if (
        getSession("local", "chat-next-web-store").state.sessions.length !==
        (data.data as Array<ChatList>).length
      ) {
        removeAllSessions();
        const sessions = (data.data as Array<ChatList>).map((item) => {
          return createSessionByid({
            id: item.id.toString(),
            title: item.title,
          });
        });
        setSessions(sessions);
      }

      // if (
      //   getSession("local", "chat-next-web-store").state.sessions !==
      //   data.data.length
      // )
      return data;
    };
    data();
  }, []);

  const [selectedIndex, selectSession, moveSession] = useChatStore((state) => [
    state.currentSessionIndex,
    state.selectSession,
    state.moveSession,
  ]);
  const chatStore = useChatStore();
  const navigate = useNavigate();

  const onDragEnd: OnDragEndResponder = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    moveSession(source.index, destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chat-list">
        {(provided) => (
          <div
            className={styles["chat-list"]}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {sessions.map((item, i) => (
              <ChatItem
                title={item.title}
                key={item.id}
                id={item.id + ""}
                index={i}
                selected={i === selectedIndex}
                onClick={() => {
                  navigate(Path.Chat);
                  selectSession(i);
                  console.log(Number(data[i].id));
                }}
                onDelete={async () => {
                  if (
                    !props.narrow ||
                    (await showConfirm(Locale.Home.DeleteChat))
                  ) {
                    chatStore.deleteSession(i);
                    // deleteChat();
                  }
                }}
                narrow={props.narrow}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
