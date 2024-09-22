"use client";

import Flat from "@/components/Flat";
import { FlatList, flats } from "@/config";
import { useTypedSelector } from "@/hooks/selector.hook";
import { IRealFlat } from "@/interfaces/flat.interface";
import styles from "@/page/FlatsPage/styles.module.scss";
import { useEffect, useState } from "react";

const Flats = () => {

  const [flats, setFlats] = useState<IRealFlat[]>([]);

  const search = useTypedSelector(
    (selector) => selector.navigationSlice.search.flats
  );
  // const filters = useTypedSelector((selector) => selector.filtersSlice.flats);

  const getImage = async (imageId: number) => {
    const response = await fetch("https://3133319-bo35045.twc1.net/api/v0/get_images/?ids=" + imageId, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    return data[0];
  }

  const getHouses = async () => {
    const response = await fetch("https://3133319-bo35045.twc1.net/api/v0/house/?distance=10000000000&i_am_owner=U&is_have_bail=U&is_have_fines=U&is_sunny_side=U&is_have_elevator=U&is_have_balcony=U&is_have_parking_space=U&is_have_security=U&is_have_horizontal_bars=U&is_have_conditioner=U&is_have_garbage_chute=U&is_have_wifi=U&is_have_transport_close=U&is_possible_smoke=U&is_possible_animals=U&is_have_washing_machine=U&is_have_dryer=U&is_have_iron=U&is_have_dishwasher=U&is_have_hair_dryer=U&is_have_tv=U&is_have_guest_table=U&is_have_guest_cabinet=U&min_count_photos=0&is_favorite=U", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    data.map(async (house: any) => {
      console.log('====>', house.photos_ids[0])
      if (house.photos_ids[0]) {
        const imageLink = await getImage(house.photos_ids[0])
        console.log('imageLink--->', imageLink)
        house.image = 'https://3133319-bo35045.twc1.net/media/' + imageLink
      } else {
        house.image = "https://img.dmclk.ru/vitrina/owner/ce/5e/ce5ee961a36f4648864c92328a8263e0.jpg"
      }
    })
    console.log('data----->', data);
    setFlats(data);
  }

  useEffect(() => {
    getHouses();
  }, [])

  return (
    <div className={styles.flats}>
      <div className={styles.container}>
        {flats.map(
          (flat) =>
            // flat.user.name.toLowerCase().startsWith(search.toLowerCase()) &&
            // flat.price <= filters.price.to &&
            // flat.price >= filters.price.from && (
            <div
              className={styles.flat}
              key={flat.id.toString() + flat.cost?.toString()}>
              <Flat flat={flat} />
            </div>
          // )
        )}
      </div>
    </div>
  );
};

export default Flats;
