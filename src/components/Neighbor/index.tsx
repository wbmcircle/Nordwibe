"use client"

import styles from "@/components/Neighbor/styles.module.scss"
import Image from "next/image";
import { FC } from "react";
import Link from "next/link"
import { IRealUser } from "@/interfaces/user.interface";

interface INeighbor {
  user: IRealUser,
  hide: (id: number) => void
}

const Neighbor: FC<INeighbor> = ({ user, hide }) => {
  return (
    <div className={styles.neighbor}>
      <Link href={`/profile/${user.id}`}>
        <div className={styles.containerUser}>
          <div className={styles.userCard}>
            <div className={styles.avatar}>
              <Image src={"/icons/userProfile.svg"} alt="avatar" width={100} height={100} />
            </div>
            <div className={styles.userInformation}>
              <h1>{user.first_name}</h1>
              <h4>из г. {user.my_town}</h4>
            </div>
          </div>
          <h1>XX%</h1>
        </div>
      </Link>
      {/* <div className={styles.userInfo}>
        {parameters.map((parameter, _) => (
          <div>
            <h4>{parameter.value}</h4>
          </div>
        ))}
        LL
      </div> */}
      <div className={styles.buttons}>
        <Link href={`/chat/${user.id}`}><button>Написать</button></Link>
        <button onClick={() => hide(user.id)}>Скрыть</button>
      </div>
    </div>
  )
}

export default Neighbor;
