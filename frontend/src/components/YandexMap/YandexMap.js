import { YMaps, Map, GeolocationControl, SearchControl, ObjectManager} from '@pbe/react-yandex-maps';
import { useState } from 'react';

import { stores } from "../../helpers/StoreList";


import "./style.css";

const YandexMap = () => {
    const [selectedStore, setSelectedStore] = useState(null);

    return (
        <div className="maps">
            <YMaps>
                <Map
                    defaultState={{
                        center: [55.75, 37.57],
                        zoom: 12,
                        controls: ["zoomControl", "fullscreenControl"],
                    }}
                    modules={["control.ZoomControl", "control.FullscreenControl", "control.SearchControl"]}
                    style={{ width: "100%", height: "100%", margin: "50px auto 0", position: 'relative' }}
                >
                    <ObjectManager
                        options={{
                            clusterize: true,
                            gridSize: 32,
                        }}
                        objects={{
                            openBalloonOnClick: true,
                            preset: "islands#greenDotIcon",
                        }}
                        clusters={{
                            preset: "islands#redClusterIcons",
                        }}
                        defaultFeatures={stores}
                        modules={[
                            "objectManager.addon.objectsBalloon",
                            "objectManager.addon.objectsHint",
                        ]}
                        onClick={(e) => {
                            const featureId = e.get("objectId");
                            setSelectedStore(stores.find((store) => store.id === featureId));
                        }}
                        />

                    <SearchControl />

                    <GeolocationControl options={{ float: "left" }} />
                </Map>
            </YMaps>
        </div>
    );
};

export default YandexMap;
