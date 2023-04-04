import { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('http://github.com/pedrocmoreira.png');

  const toast = useToast();
  

  async function handleUserPhotoSelect() {
    try {
      setPhotoIsLoading(true);
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      });

      if (photoSelected.canceled) {
        return;
      }

      if(photoSelected.assets[0].uri){
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)
        
        if(photoInfo.size && (photoInfo.size / 1024 / 1024 ) > 5){
         return toast.show({
           title: 'Essa imagem é muito grande. Escolha uma de até 5MB',
           placement: 'top',
           bgColor: 'red.500'
         })
         
        }

        setUserPhoto(photoSelected.assets[0].uri);
      }
    } catch (error) {
      console.log(error)
    }finally{
      setPhotoIsLoading(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title='Perfil' />
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {
            photoIsLoading ?
              <Skeleton
                w={PHOTO_SIZE}
                h={PHOTO_SIZE}
                rounded='full'
                startColor='gray.500'
                endColor='gray.400'
              />
              :
              <UserPhoto
                source={{ uri: userPhoto }}
                alt='Foto do usuário'
                size={PHOTO_SIZE}
              />
          }
          <TouchableOpacity activeOpacity={.7} onPress={handleUserPhotoSelect}>
            <Text color='green.500' fontWeight='bold' fontSize='md' mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input
            placeholder='Nome'
            bg='gray.600'
          />
          <Input
            value='pedromoreira@email.com'
            bg='gray.600'
            isDisabled
          />


          <Heading color='gray.200' fontSize='md' mb={2} mt='12' alignSelf='flex-start' fontFamily='heading'>
            Alterar Senha
          </Heading>

          <Input
            bg='gray.600'
            placeholder='Senha antiga'
            secureTextEntry
          />

          <Input
            bg='gray.600'
            placeholder='Nova senha'
            secureTextEntry
          />

          <Input
            bg='gray.600'
            placeholder='Confirme a nova senha'
            secureTextEntry
          />

          <Button
            title='Atualizar'
            mt={4}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}