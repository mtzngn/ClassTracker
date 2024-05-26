// ClassCard.tsx
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

type ClassCardProps = {
  id: string;
  name: string;
  onPress: () => void;
};

const ClassCard: React.FC<ClassCardProps> = ({name, onPress}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.edge} />
      <Text style={styles.title}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 50,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },
  title: {
    fontSize: 18,
  },
  edge: {
    width: 4,
    height: '100%',
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    marginRight: 8,
    backgroundColor: '#4368FA',
  },
});

export default ClassCard;
