"use client";

import Button from "@/components/Button";
import LinkCard from "@/components/LinkCard";
import { LinkCardsProfile, flats, profileUsersCards, users } from "@/config";
import styles from "@/page/Profile/styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC, useEffect, useRef } from "react";
import TGLOGO from "../../../public/svgs/tg";
import VKLOGO from "../../../public/svgs/vk";
import PHONELOGO from "../../../public/svgs/phone";
import MAILLOGO from "../../../public/svgs/mail";
import NOTIFICATIONLOGO from "../../../public/svgs/notification";
import READLOGO from "../../../public/svgs/read";
import HELPLOGO from "../../../public/svgs/help";
import EXITLOGO from "../../../public/svgs/exit";
import { useTypedSelector } from "@/hooks/selector.hook";
import Diagram from "@/components/Diagram";
import UserIdentityCard from "@/components/UserIdentiryCard";
import Flat from "@/components/Flat";
import { useState } from "react";
import { IRealUserMe, IUser } from "@/interfaces/user.interface";
import Neighbor from "@/components/Neighbor";

const Profile: FC<{ id: string }> = ({ id }) => {
  // const user = users.find((user) => user.id === Number(id));
  const yourUser = useTypedSelector((selector) => selector.userSlice.user);
  const hide = (id: number) => {
    setNeighbors(neighbors.filter((user) => user.id != id));
  };
  const [neighbors, setNeighbors] = useState<Array<IUser>>(users);
  const calcNewMessages = useRef<number>(0);
  const [resCount, setResCount] = useState(0);
  let messages: IUser | null = null;
  messages = useTypedSelector((selector) => selector.userSlice.user);
  const [user, setUser] = useState<IRealUserMe>({} as IRealUserMe);
  const age =
    user && user.date_birthday
      ? new Date().getFullYear() - new Date(user.date_birthday).getFullYear()
      : 0;

  if (!user) return notFound();

  const getUserData = async () => {
    const response = await fetch("https://3133319-bo35045.twc1.net/api/v0/users/me/", {
      method: "GET",
      credentials: "include",
    })
    const data = await response.json();
    setUser(data);
  }

  useEffect(() => {
    calcNewMessages.current = 0;
    // messages.notifications.map((n) => {
    //   if (n[0] == 1) {
    //     calcNewMessages.current += 1;
    //   }
    // });
    getUserData();
    setResCount(calcNewMessages.current);
  }, []);

  return (
    <div className={styles.profile}>
      <div className={styles.general}>
        <div className={styles.userCard}>
          <div className={styles.avatar}>
            {/* заглушка - на половину ширину. фотка юзера на весь размер, со скруглением */}
            <Image
              src={user.avatar ? user.avatar : "/icons/userProfile.svg"}
              alt="avatar"
              width={100}
              height={100}
            />
          </div>
          <div className={styles.userInformation}>
            <h1>
              {user.first_name}{age ? ", " + age : 0}
            </h1>
            <h4>из г. {user.home_town}</h4>
            <h4>@{user.username}</h4>
          </div>
        </div>

        <ul className={styles.parameters}>
          {/* {user.parameters.map((parameter, i) => (
            <li key={i}>
             
              <p>{parameter.value}</p>
            </li>
          ))} */}
          <li>
            <Image
              src={`/icons/purpose.svg`}
              alt="purpose"
              width={100}
              height={100}
            />
            <p>{user.purpose}</p>
          </li>
          <li>
            <Image
              src={`/icons/pencil.svg`}
              alt="status"
              width={100}
              height={100}
            />
            <p>
              {user.occupation?.toLowerCase() == "без работы"
                ? "Путешествую"
                : user.occupation}
            </p>
          </li>
        </ul>
        {user.id === yourUser.id && (
          <Button>
            <Link href={`/profile/${user.id}/parameters`}>
              Редактировать профиль
            </Link>
          </Button>
        )}
        {user.id !== yourUser.id && (
          <div className={styles.buttons}>
            <Link href={`/chat/${id}`}>
              <button>Написать</button>
            </Link>
            {/* <button onClick={() => hide(id)}>Скрыть</button> 
                fixme*/}
            <button>Скрыть</button>
          </div>
        )}
      </div>

      <div className={styles.cards}>
        {/* {LinkCardsProfile.map((card, i) => ( */}
        {/* // <Link key={i} href={`/profile/${id}` + card[2]}> */}
        <LinkCard
          image={LinkCardsProfile[0][0]}
          text={LinkCardsProfile[0][1]}
          text_two={
            user.pets?.toLowerCase() == "да" ? "Есть питомцы" : "Без питомцев"
          }
        />
        <LinkCard
          image={LinkCardsProfile[1][0]}
          text={LinkCardsProfile[1][1]}
          text_two={
            user.first_aid?.toLowerCase() == "да"
              ? "Повышенная чувствительность"
              : "Не чувствителен к аллергенам"
          }
        />
        <LinkCard
          image={LinkCardsProfile[2][0]}
          text={LinkCardsProfile[2][1]}
          text_two={
            user.occupation?.toLowerCase() == "без работы" ||
              user.occupation?.toLowerCase() == "неизвестно"
              ? "Путешествую"
              : user.occupation
          }
        />
        <LinkCard
          image={LinkCardsProfile[3][0]}
          text={LinkCardsProfile[3][1]}
          text_two={
            user.social_interaction?.toLowerCase() == "да"
              ? "Устраиваю перекуры"
              : user.social_interaction?.toLowerCase() == "иногда"
                ? "Парю"
                : "Не курю"
          }
        />

        {/* // </Link> */}
        {/* // ))} */}
      </div>

      <div className={styles.compatibility}>
        <div className={styles.diagram}>
          <Diagram />
        </div>

        <h4>
          {user.id === yourUser.id
            ? "пользователей приложения могут стать твоими друзьями"
            : "Совместимость с тобой"}
        </h4>
      </div>

      <div className={styles.profileLinksList}>
        <h4>Контакты</h4>
        <ul>
          <li>
            <TGLOGO />
            {/* <a
              href={`https://t.me/${user.contact.telegram.split("@")[1]}`}
              target="_blank"
            > */}{" "}
            <p>user_telegram</p>
            {/* </a> */}
          </li>
          <li>
            <VKLOGO />
            {/* <a
              href={`https://vk.com/${user.contact.telegram.split("@")[1]}`}
              target="_blank"
            > */}{" "}
            <p>user_vk</p>
            {/* </a> */}
          </li>
          <li>
            <PHONELOGO />
            {/* <a href={`tel:${user.}`} target="_blank">
            
            </a> */}
            <p>user_number</p>
          </li>
          <li>
            <MAILLOGO />
            <a href={`mailto:${user.email}`} target="_blank">
              {" "}
              <p>{user.email}</p>
            </a>
          </li>
        </ul>

        {user.id === yourUser.id && (
          <Button>
            <Link href={`/profile/${user.id}/parameters`}>
              Изменить контакты
            </Link>
          </Button>
        )}
      </div>

      {/* Если квартиры чела есть*/}
      {/* {true && ( */}
      {/* <div className={styles.flats}> */}
      {/* <h4>Предложения жилья:</h4> */}
      {/* Тут тащим квартиры юзера или чела чей айдишник*/}
      {/* <Flat flat={flats[1]} /> */}
      {/* </div> */}
      {/* )} */}

      {/* Если у п в лк нет квартир и это лк*/}
      {user.id === yourUser.id && false && (
        <div className={styles.flats}>
          <p>Тут должны быть предложения жилья, но ты пока ничего не добавил</p>
          <button className={styles.button}>
            <Link href="/add-apartment/1">Позвать к себе соседей</Link>
          </button>
        </div>
      )}

      {user.id === yourUser.id && (
        <div className={styles.profileLinksList}>
          <h4>А еще:</h4>
          <ul>
            <li>
              <div className={styles.messages_icon}>
                {resCount > 0 && (
                  <>
                    <div className={styles.new_messages_count}>
                      {calcNewMessages.current}
                    </div>
                  </>
                )}
                <NOTIFICATIONLOGO />
              </div>
              <Link href={"/notifications"}>
                <p>Уведомления</p>
              </Link>
            </li>

            <li>
              <HELPLOGO />
              <Link href={"/chat/support"}>
                <p>Поддержка</p>
              </Link>
            </li>
            <li>
              <EXITLOGO />
              <p>Выход</p>
            </li>
          </ul>
        </div>
      )}

      {/* {user.id != yourUser.id && (
        <div className={styles.usersCols}>
          <h4>Похожие пользователи</h4>
          {neighbors.map((user) => (
            <Neighbor user={user} hide={hide} />
          ))}
        </div>
      )} */}
    </div>
  );
};

export default Profile;
