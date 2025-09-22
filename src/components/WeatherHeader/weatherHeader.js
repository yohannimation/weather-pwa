import { useTranslation } from 'react-i18next';
import { motion, useTransform, useScroll } from "framer-motion";

import InputSearchBar from '../SearchBar/InputSearchBar';
import Icon from '../Icon';

import styles from './weatherHeader.module.css';

const WeatherHeader = (props) => {
    const { t } = useTranslation();
    const {
        apparentTemperature,
        icon,
        precipitation,
        temperature,
        time,
    } = props.currentWeather;

    // Scroll animation data
    const scrollData = useScroll();
    const headerHeight = useTransform(scrollData.scrollY, [0, 160], ["240px", "90px"])
    const searchBarWidth = useTransform(scrollData.scrollY, [0, 160], ["90%", "50%"])
    const temperatureSize = useTransform(scrollData.scrollY, [0, 160], ["2.3em", "1.5em"])

    const dataContainerHeight = useTransform(scrollData.scrollY, [0, 160], ["110px", "40px"])
    const dataContainerPaddingTop = useTransform(scrollData.scrollY, [0, 160], ["0px", "5px"])
    const dataContainerPositionTop = useTransform(scrollData.scrollY, [0, 160], ["60px", "0px"])
    const dataContainerPositionRight = useTransform(scrollData.scrollY, [0, 160], ["50%", "0%"])
    const dataContainerPositionLeft = useTransform(scrollData.scrollY, [0, 160], ["0%", "60%"])
    const dataContainerRowTemplate = useTransform(scrollData.scrollY, [0, 160], ["3fr 1fr", "1fr 0fr"])

    const secondaryOpacity = useTransform(scrollData.scrollY, [0, 50], [1, 0])

    const gifMargin = useTransform(scrollData.scrollY, [0, 160], ["0px 0px 5px 10px", "0px"])
    const gifHeight = useTransform(scrollData.scrollY, [0, 160], ["138px", "80px"])
    const gifPositionTop = useTransform(scrollData.scrollY, [0, 160], ["60px", "0px"])
    const gifPositionRight = useTransform(scrollData.scrollY, [0, 160], ["0%", "-65%"])
    const gifPositionLeft = useTransform(scrollData.scrollY, [0, 160], ["50%", "120%"])
    const gifOpacity = useTransform(scrollData.scrollY, [0, 60], [1, 0])

    const lastUpdateTop = useTransform(scrollData.scrollY, [0, 160], ["190px", "47px"])

    return (
        <motion.header className={styles.header}>
            <motion.span 
                className={styles.backgroundHeader}
                style={{ height: headerHeight }}
            ></motion.span>

            <motion.div 
                className={styles.searchBarContainer}
                style={{ width: searchBarWidth }}
            >
                <InputSearchBar />
            </motion.div>

            <motion.div className={styles.dataContainer}
                style={{
                    height: dataContainerHeight,
                    paddingTop: dataContainerPaddingTop,
                    top: dataContainerPositionTop,
                    right: dataContainerPositionRight,
                    left: dataContainerPositionLeft,
                    gridTemplateRows: dataContainerRowTemplate
                }}
            >
                <motion.div className={styles.mainData} style={{ fontSize: temperatureSize }} >
                    <span>{temperature}</span>
                </motion.div>
                <motion.div className={styles.secondaryData} style={{ opacity: secondaryOpacity }}>
                    <div className={styles.secondaryDataItem}>
                        {t("components-weatherHeader-feeling")} {apparentTemperature}
                    </div>
                    <div className={styles.secondaryDataItem}>
                        {t("components-weatherHeader-precipitation")} {precipitation}
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                className={styles.gifContainer}
                style={{
                    margin: gifMargin,
                    height: gifHeight,
                    top: gifPositionTop,
                    right: gifPositionRight,
                    left: gifPositionLeft,
                    opacity: gifOpacity
                }}
            >
                <Icon size={180} name={icon} />
            </motion.div>

            <motion.div
                className={styles.lastUpdateContainer}
                style={{
                    top: lastUpdateTop
                }}
            >
                <span>{time}</span>
            </motion.div>
        </motion.header>
    );
}

export default WeatherHeader;
