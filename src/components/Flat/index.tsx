"use client";

import styles from "@/components/Flat/styles.module.scss";
import { useTypedSelector } from "@/hooks/selector.hook";
import { IFlat, IRealFlat } from "@/interfaces/flat.interface";
import { IUser } from "@/interfaces/user.interface";
import { AppDispatch } from "@/store";
import { addToFavourites } from "@/store/slices/user";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { usersList } from "@/config";

const Flat: FC<{ flat: IRealFlat }> = ({ flat }) => {

  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const user = useTypedSelector((selector) => selector.userSlice.user);
  const mapRef = useRef();
  const [district, setDistrict] = useState<string>("");

  // const geocode = (ymaps: any) => {
  //   ymaps.geocode(flat.address).then((res: any) => {
  //     let firstGeoObject = res.geoObjects.get(0);

  //     ymaps
  //       .geocode(firstGeoObject.geometry._coordinates, {
  //         kind: "district",
  //         results: 1,
  //       })
  //       .then((res: any) => {
  //         let firstGeoObject = res.geoObjects.get(0);
  //         setDistrict(firstGeoObject.getAddressLine());
  //       });
  //   });
  // };

  return (
    <Link href={`/flats/${flat.id}`}>
      <div className={styles.flat}>
        <div className={styles.banner}>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            slidesPerView={1}
            slidesPerGroup={1}
            centeredSlides={true}
            centeredSlidesBounds={true}
            pagination={{ clickable: true }}
            navigation
          >
            {/* {flat.photos_ids?.map((photo) => {
              return ( */}
            <SwiperSlide className={styles.slide}>
              <div className={styles.img}>
                <img src={flat.image} alt="banner" style={{ height: 300, width: '100%' }} />
              </div>
            </SwiperSlide>
            {/* );
            })} */}
          </Swiper>
        </div>
        <div className={styles.containerUser}>
          <div className={styles.userCard}>
            <div className={styles.avatar}>
              <img
                src={
                  usersList[flat.creator_id]?.avatar
                    ? usersList[flat.creator_id]?.avatar
                    : "/icons/userProfile.svg"
                }
                alt="avatar"
                width={"100%"}
                height={"100%"}
              />
            </div>
            <div className={styles.userInformation}>
              <h1>{usersList[flat.creator_id]?.first_name}</h1>
              <h4>{usersList[flat.creator_id]?.my_town}</h4>
            </div>
          </div>
          <h1 className="ml-5">XX%</h1>
        </div>
        <h3 className={styles.price}>{flat.cost}руб/мес</h3>
        <span className={styles.commun}>
          Комуналка:{flat.cost_utilities}руб/мес
        </span>

        <div className={styles.flatInfo}>
          <div className={styles.blocks}>
            <ul>
              <li>
                {flat.count_neighbors === 1
                  ? "Общая комната"
                  : "Изолированная комната"}
              </li>
              <li>{flat.is_have_bail ? "Есть залог" : "Без залога"}</li>
              <li>
                {flat.floor}/{flat.building_floor} этаж
              </li>
              <li>
                {flat.i_am_owner ? "Я собственник" : "Снимаю эту квартиру"}
              </li>
              <li>
                {flat.is_possible_animals
                  ? "Можно с животными"
                  : "Без животных"}
              </li>
              <li>{flat.is_possible_smoke ? "Можно курить" : "Не курить"}</li>
            </ul>
          </div>
          <div className={styles.bottomBlocks}>
            <div>
              <ul>
                <li>Адрес: {flat.address}</li>
                <li>
                  Район:{" "}
                  {
                    district.split(",")
                    [district.split(",").length - 1]

                  }
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <YMaps query={{ apikey: "a397206b-3df1-47d3-b87e-de0031179a0e" }}>
          <Map
            onLoad={(ymaps) => geocode(ymaps)}
            style={{ display: "none" }}
            instanceRef={mapRef}
            defaultState={{
              center: [55.75, 37.57],
              zoom: 9,
              controls: ["zoomControl", "fullscreenControl"],
            }}
            modules={[
              "control.ZoomControl",
              "control.FullscreenControl",
              "multiRouter.MultiRoute",
              "geocode",
            ]}
          >
            <Placemark defaultGeometry={[55.75, 37.57]} />
          </Map>
        </YMaps> */}
        <div className={styles.userButtons}>
          <div>
            <Link href={`/profile/${flat.creator_id + 1}`}>
              <button>Написать</button>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Flat;
