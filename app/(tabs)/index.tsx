import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Ticket, Shield, ArrowRight, Star, TrendingUp } from 'lucide-react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  const popularNumbers = [
    7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83
  ];

  const quickStats = [
    { icon: Ticket, label: 'Tickets Bought', value: '12', color: '#a855f7' },
    { icon: Shield, label: 'Coverage Active', value: '$5,000', color: '#06b6d4' },
    { icon: Star, label: 'Winnings', value: '$125', color: '#eab308' },
    { icon: TrendingUp, label: 'Savings', value: '$350', color: '#10b981' },
  ];

  const handleNumberSelect = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== number));
    } else {
      if (selectedNumbers.length >= 6) {
        Alert.alert('Maximum Numbers', 'You can only select up to 6 numbers per ticket.');
        return;
      }
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const number = parseInt(searchQuery);
      if (number >= 1 && number <= 99) {
        handleNumberSelect(number);
        setSearchQuery('');
      } else {
        Alert.alert('Invalid Number', 'Please enter a number between 1 and 99.');
      }
    }
  };

  const handleProceedToInsurance = () => {
    if (selectedNumbers.length === 0) {
      Alert.alert('No Numbers Selected', 'Please select at least one lottery number to continue.');
      return;
    }
    
    router.push({
      pathname: '/lottery/selection',
      params: {
        selectedNumbers: JSON.stringify(selectedNumbers),
      }
    });
  };

  const clearSelection = () => {
    setSelectedNumbers([]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#1a1625', '#2d1b69', '#3730a3']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Good morning!</Text>
          <Text style={styles.userName}>Welcome to LuckyGuard</Text>
          <Text style={styles.subtitle}>Search and select your lucky numbers</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Lottery Number Search */}
        <View style={styles.searchSection}>
          <Text style={styles.sectionTitle}>Search Lottery Numbers</Text>
          
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Enter a number (1-99)"
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
              keyboardType="numeric"
              maxLength={2}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Search size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {selectedNumbers.length > 0 && (
            <View style={styles.selectedContainer}>
              <View style={styles.selectedHeader}>
                <Text style={styles.selectedTitle}>Selected Numbers ({selectedNumbers.length}/6)</Text>
                <TouchableOpacity onPress={clearSelection}>
                  <Text style={styles.clearButton}>Clear All</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.selectedNumbers}>
                {selectedNumbers.map((number, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.selectedNumber}
                    onPress={() => handleNumberSelect(number)}
                  >
                    <Text style={styles.selectedNumberText}>{number}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Popular Numbers */}
        <View style={styles.popularSection}>
          <Text style={styles.sectionTitle}>Popular Numbers</Text>
          <View style={styles.numbersGrid}>
            {popularNumbers.map((number) => (
              <TouchableOpacity
                key={number}
                style={[
                  styles.numberButton,
                  selectedNumbers.includes(number) && styles.selectedNumberButton
                ]}
                onPress={() => handleNumberSelect(number)}
              >
                <Text style={[
                  styles.numberText,
                  selectedNumbers.includes(number) && styles.selectedNumberText
                ]}>
                  {number}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Your Overview</Text>
          <View style={styles.statsGrid}>
            {quickStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <stat.icon size={24} color={stat.color} />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Proceed Button */}
        {selectedNumbers.length > 0 && (
          <TouchableOpacity style={styles.proceedButton} onPress={handleProceedToInsurance}>
            <LinearGradient
              colors={['#a855f7', '#7c3aed']}
              style={styles.proceedButtonGradient}
            >
              <Text style={styles.proceedButtonText}>
                Choose Insurance Type ({selectedNumbers.length} numbers)
              </Text>
              <ArrowRight size={20} color="#ffffff" />
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    gap: 8,
  },
  greeting: {
    fontSize: 16,
    color: '#e2e8f0',
    fontWeight: '500',
  },
  userName: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#cbd5e1',
    marginTop: 4,
  },
  content: {
    padding: 20,
    gap: 24,
  },
  searchSection: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchButton: {
    backgroundColor: '#a855f7',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedContainer: {
    backgroundColor: '#faf5ff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e9d5ff',
  },
  selectedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  selectedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7c3aed',
  },
  clearButton: {
    fontSize: 14,
    color: '#dc2626',
    fontWeight: '500',
  },
  selectedNumbers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectedNumber: {
    backgroundColor: '#7c3aed',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedNumberText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  popularSection: {
    gap: 16,
  },
  numbersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  numberButton: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedNumberButton: {
    backgroundColor: '#7c3aed',
    borderColor: '#7c3aed',
  },
  numberText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  statsContainer: {
    gap: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    width: (width - 56) / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  proceedButton: {
    borderRadius: 12,
    marginTop: 8,
  },
  proceedButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
  },
  proceedButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});