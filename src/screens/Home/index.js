import React, { useState } from 'react';
import { Alert, Image } from 'react-native';
import {
    Container,
    Animation,
    Input,
    Button,
    ButtonText,
    AddressEstacaoBike,
    Text
} from './styles';
import logo from '../../assets/logo.png';
import api from '../../services/api';

export default function Home() {
    const [bairro, setBairro] = useState('');
    const [estacaoBike, setestacaoBike] = useState(null);

    async function handleBuscar() {
        try {
            const { status, data } = await api.get(`api/3/action/datastore_search?q=${bairro}&resource_id=e6e4ac72-ff15-4c5a-b149-a1943386c031`);

            if (status != 200 || data.erro) {
                Alert.alert('Buscar', 'Digite um bairro válido.');
            } else {
                setestacaoBike(data.result.records);
            }

        } catch (error) {
            Alert.alert('Buscar', 'Digite um bairro válido');
        }
    };

    async function handleLimpar() {
        setestacaoBike(null);
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
                {!estacaoBike &&
                    <Input
                        keyboardType="default"
                        maxLength={30}
                        onChangeText={setBairro}
                        onSubmitEditing={handleBuscar}
                        placeholder="Digite o Bairro do estação que deseja buscar"
                        placeholderTextColor="#2F48D4"
                        value={bairro}
                    />
                }

                <Button
                    activeOpacity={0.8}
                    onPress={estacaoBike ? handleLimpar : handleBuscar}>
                    <ButtonText>
                        {estacaoBike ? 'Limpar' : 'Buscar'}
                    </ButtonText>
                </Button>
            </Animation>

            {estacaoBike &&
                <AddressEstacaoBike>
                
                    <Text>Bairro: {bairro}{'\n'}</Text>
                    <Text>Nome da Estação: {estacaoBike[0].nome}{'\n'}</Text>
                    <Text>Endereco: {estacaoBike[0].localizacao}{'\n'}</Text>
                    <Text>Capacidade: {estacaoBike[0].capacidade}{'\n'}</Text>
                </AddressEstacaoBike>
            }
        </Container>
    );
}
