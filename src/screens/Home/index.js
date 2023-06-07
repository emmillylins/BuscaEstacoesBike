import React, { useState } from 'react';
import { Alert, Image } from 'react-native';
import {
    Container,
    Animation,
    Input,
    Button,
    ButtonText,
    AddressHospital,
    Text
} from './styles';
import logo from '../../assets/logo.png';
import api from '../../services/api';

export default function Home() {
    const [bairro, setBairro] = useState('');
    const [hospital, setHospital] = useState(null);

    async function handleBuscar() {
        try {
            const { status, data } = await api.get(`api/3/action/datastore_search?q=${bairro}&resource_id=a2dab4d4-3a7b-4cce-b3a7-dd7f5ef22226&limit`);

            if (status != 200 || data.erro) {
                Alert.alert('Buscar', 'Digite um Bairro válido.');
            } else {
                setHospital(data.result.records);
            }

        } catch (error) {
            Alert.alert('Buscar', 'Digite um Bairro válido');
        }
    };

    async function handleLimpar() {
        setHospital(null);
        setBairro('');
    }

    return (
        <Container>
            <Animation
                animation='bounceInDown'
                delay={100}
                duration={1500}
            >
                <Image source={logo} />
            </Animation>

            <Animation
                animation='bounceInRight'
                delay={100}
                duration={1500}
            >
                {!hospital &&
                    <Input
                        keyboardType="default"
                        maxLength={30}
                        onChangeText={setBairro}
                        onSubmitEditing={handleBuscar}
                        placeholder="Digite o Bairro do hospital que deseja buscar"
                        placeholderTextColor="#688d38"
                        value={bairro}
                    />
                }

                <Button
                    activeOpacity={0.8}
                    onPress={hospital ? handleLimpar : handleBuscar}>
                    <ButtonText>
                        {hospital ? 'Limpar' : 'Buscar'}
                    </ButtonText>
                </Button>
            </Animation>

            {hospital &&
                <AddressHospital>
                
                    <Text>Bairro: {bairro}{'\n'}</Text>
                    <Text>Nome do hospital: {hospital[0].nome_oficial}{'\n'}</Text>
                    <Text>Endereco: {hospital[0].endereço}{'\n'}</Text>
                    <Text>Especialidade: {hospital[0].especialidade}{'\n'}</Text>
                    <Text>Telefone: {hospital[0].fone}</Text>
                </AddressHospital>
            }
        </Container>
    );
}