import React, { useRef, useState } from 'react';
import { View, Image, TouchableOpacity, Dimensions,Text } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import styles from './styles';
import Svg, { Path } from 'react-native-svg';
import AppIntroStep2 from "../../../assets/images/AppIntroStep2.png";
import AppIntroStep3 from "../../../assets/images/AppIntroStep3.png";

const { width, height } = Dimensions.get('window');
const waveHeight = height * 0.75; // Define waveHeight to control the height of CurvedWave and other elements

export default function AppIntro({ navigation }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);

    const slides = [
        {
            key: '1',
            title: 'Best Tips for Your Diet',
            text: 'Quisque sit amet sagittis erat. Duis pharetra cursus venenatis. Nulla maximus porta velit ut molestie.',
            image: AppIntroStep3,
        },
        {
            key: '2',
            title: 'Stay Fit and Healthy',
            text: 'Explore a variety of exercises that keep you active and healthy. Boost your energy and vitality with us.',
            image: AppIntroStep2,
        },
        {
            key: '3',
            title: 'Join Our Community',
            text: 'Connect with like-minded people and share your progress. We are here to support you on your journey.',
            image: AppIntroStep3,
        },
    ];

    const onDone = () => {
        navigation.navigate('Login');
    };

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            sliderRef.current.goToSlide(nextIndex, true);
        } else {
            onDone();
        }
    };

    const renderSlide = ({ item }) => (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {/* Image Container */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={item.image}
                    style={styles.image}
                    resizeMode="stretch" // Keeps the original aspect ratio within the view
                />
            </View>
    
            {/* Curved Wave at the bottom */}
            <CurvedWave />
    
            {/* Text Container positioned above the wave */}
            <View style={{
                position: 'absolute',
                bottom: waveHeight * 0.2,
                left: 20,
                right: 20,
                alignItems: 'center',
                paddingHorizontal: 10,
                backgroundColor: 'transparent',
            }}>
                <Text style={[styles.title, { color: 'blue', marginBottom: 35, fontSize: 18 }]}>{item.title}</Text>
                <Text style={[styles.text, { fontSize: 14, textAlign: 'center', }]}>{item.text}</Text>
            </View>
        </View>
    );
    
    
    
    

    const CurvedWave = () => (
        <Svg height={waveHeight} width={width} viewBox={`0 0 ${width} ${waveHeight * 0.3}`} style={{ position: 'absolute', bottom: 0 }}>
            {/* Shadow Path with Opacity */}
            <Path
                d={`M0 ${waveHeight / 4} Q${width * .25} ${waveHeight / 8}, ${width * 5.5} ${waveHeight / 5} T${width} 0 V${waveHeight} H0 Z`}
                fill="black" // Shadow color
                opacity={0.1} // Opacity for the shadow effect (0.1 for 10% opacity)
                transform={`translate(0, 8)`} // Offset the shadow slightly downward
            />
    
            {/* Main Curved Wave Path */}
            <Path
                d={`M0 ${waveHeight / 3.88} Q${width * 0.25} ${waveHeight / 7.5}, ${width * 0.51} ${waveHeight / 4.84} T${width} 0 V${waveHeight} H0 Z`}
                fill="white" // Fill color for the main wave
            />
            
            {/* Border along the curved wave with transparency */}
            <Path
                d={`M0 ${waveHeight / 4} Q${width * 0.25} ${waveHeight / 8}, ${width * 0.5} ${waveHeight / 5} T${width} 0`}
                stroke='blue' // Primary color
                strokeWidth="8"
                opacity={0.4} // Set opacity to make it transparent
                
                fill="none"
            />
        </Svg>
    );
    
    
    

    return (
        <View style={{ flex: 1 }}>
            <AppIntroSlider
                ref={sliderRef}
                data={slides}
                renderItem={renderSlide}
                onSlideChange={(index) => setCurrentIndex(index)}
                renderNextButton={() => (
                    <TouchableOpacity style={[styles.button, { backgroundColor: 'blue' }]} onPress={handleNext}>
                        <Text bold style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                )}
                renderDoneButton={() => (
                    <TouchableOpacity style={[styles.Startbutton, { backgroundColor: 'blue' }]} onPress={onDone}>
                        <Text bold style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                )}
                showSkipButton
                renderSkipButton={() => (
                    <TouchableOpacity style={styles.skipButton} onPress={onDone}>
                        <Text grayColor bold>Skip Step</Text>
                    </TouchableOpacity>
                )}
                dotStyle={{ backgroundColor: '#d3d3d3' }}
                activeDotStyle={{ backgroundColor: 'blue' }}
            />
        </View>
    );
}
