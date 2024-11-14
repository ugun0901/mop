import { Stack, useRouter, useLocalSearchParams } from 'expo-router'
import { usecallback, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
}  from "react-native";

import {
    Company,
    JobAbout,
    JobFooter,
    JobTabs,
    ScreenHeaderBtn,
    Specifics,
    } from "../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";

const JobDetails = () => {
    const params = useLocalSearchParams();
    console.log("ID: " + params.id)
    const { data, isLoading, error, refetch } = useFetch("job-detals",{
        job_id:params.id,
    }
)
    const [refreshing, setRefreshing] = useState(false);
  

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch()
        setRefreshing(false)
    }, []);
    const router = useRouter
    return (
        <safeAreaView style ={{ flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
            options={{
                headrStyle: { backgroundColor: COLORS.lightWhite},
                headerShadowVisible: false,
                headerLeft: () => (
                    <ScreenHeaderBtn
                    iconUrl={icons.left}
                    dimension='60%'
                    handlePress={() => router.back()}
                    />
                ),
                headerRight: () => (
                    <ScreenHeaderBtn iconUrl={icons.share} dimension='60%'/>
                ),
                headerTitle:"",

            }}>
                
                
            </Stack.Screen>
            <ScrollView showsVerticalScrollIndicator={false}
            refreshControl={
                    <RefreshControl refreshing={refreshing}
                    onRefresh={onRefresh}/>
                }>
                
            </ScrollView>
        </safeAreaView>
    )

}

export default JobDetails