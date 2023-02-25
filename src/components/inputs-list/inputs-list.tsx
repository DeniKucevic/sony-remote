import { IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { downloadOutline } from "ionicons/icons";
import { useContext, useEffect, useState } from "react";
import { TvInfoContext, TvInfoContextType } from "../../context";
import { getContentList, setActiveInput } from "../../services";

export const InputsList = () => {
  const { tvInfo } = useContext(TvInfoContext) as TvInfoContextType;
  const [inputs, setInputs] = useState<
    { uri: string; title: string; index: number }[]
  >([]);

  useEffect(() => {
    getContentList(tvInfo.tvUrl, tvInfo.auth).then((response) => {
      setInputs(response.data.result[0]);
    });
  }, [tvInfo]);

  const handleInputSet = (uri: string) => {
    setActiveInput(uri, tvInfo.tvUrl, tvInfo.auth);
  };

  return (
    <IonList>
      {inputs.map((input) => (
        <IonItem
          key={input.index}
          button
          onClick={() => handleInputSet(input.uri)}
        >
          <IonIcon
            slot="start"
            icon={downloadOutline}
            style={{ width: "2rem" }}
          />
          <IonLabel>{input.title}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
};
