"use client";

import Flat from "@/components/Flat";
import { useTypedSelector } from "@/hooks/selector.hook";
import { IRealFlat } from "@/interfaces/flat.interface";
import styles from "@/page/FlatsPage/styles.module.scss";
import { useEffect, useState } from "react";
import { getAllHouses, getImage } from "@/service/api";

const Flats = () => {

  const [flats, setFlats] = useState<IRealFlat[]>([]);
  const [loading, setLoading] = useState(false);

  const search = useTypedSelector(
    (selector) => selector.navigationSlice.search.flats
  );

  const getHouses = async () => {
    setLoading(true);
    const response = await getAllHouses();
    const housesWithImages = await Promise.all(response.map(async (house: any) => {
      if (house.photos_ids[0]) {
        const imageLink = await getImage(house.photos_ids[0]);
        house.image = 'https://3133319-bo35045.twc1.net/media/' + imageLink;
      } else {
        house.image = "https://img.dmclk.ru/vitrina/owner/ce/5e/ce5ee961a36f4648864c92328a8263e0.jpg";
      }
      return house;
    }));
    setFlats(housesWithImages);
    setLoading(false);
  }

  useEffect(() => {
    getHouses();
  }, [])

  return (
    <div className={styles.flats}>
      {!loading && <div className={styles.container}>
        {flats.map(
          (flat) =>
            // flat.user.name.toLowerCase().startsWith(search.toLowerCase()) &&
            // flat.price <= filters.price.to &&
            // flat.price >= filters.price.from && (
            <div
              className={styles.flat}
              key={flat?.id.toString() + flat?.cost?.toString()}>
              <Flat flat={flat} />
            </div>
          // )
        )}
      </div>}
    </div>
  );
};

export default Flats;
