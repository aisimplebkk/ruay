import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Shield, Check, X, Heart, Chrome as Home, Car, Users } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function InsuranceSelectionScreen() {
  const params = useLocalSearchParams();
  const selectedNumbers = params.selectedNumbers ? JSON.parse(params.selectedNumbers as string) : [];
  const [selectedInsurance, setSelectedInsurance] = useState<number[]>([]);
  const maxSelection = 3;

  const insuranceTypes = [
    {
      id: 1,
      name: 'Health Coverage',
      icon: Heart,
      coverage: '$2,000',
      price: 5,
      description: 'Medical expenses and hospitalization',
      benefits: ['Emergency medical', 'Hospitalization', 'Prescription drugs', 'Dental care'],
      color: '#ef4444',
    },
    {
      id: 2,
      name: 'Life Insurance',
      icon: Shield,
      coverage: '$10,000',
      price: 15,
      description: 'Death benefit and accidental coverage',
      benefits: ['Death benefit', 'Accidental coverage', 'Terminal illness', 'Funeral expenses'],
      color: '#3b82f6',
    },
    {
      id: 3,
      name: 'Property Protection',
      icon: Home,
      coverage: '$5,000',
      price: 10,
      description: 'Home and belongings protection',
      benefits: ['Fire damage', 'Theft protection', 'Natural disasters', 'Vandalism'],
      color: '#10b981',
    },
    {
      id: 4,
      name: 'Vehicle Insurance',
      icon: Car,
      coverage: '$15,000',
      price: 20,
      description: 'Comprehensive vehicle coverage',
      benefits: ['Collision coverage', 'Theft protection', 'Third-party liability', 'Roadside assistance'],
      color: '#f59e0b',
    },
    {
      id: 5,
      name: 'Family Coverage',
      icon: Users,
      coverage: '$15,000',
      price: 25,
      description: 'Protection for your entire family',
      benefits: ['Family medical', 'Child education', 'Family travel', 'Emergency support'],
      color: '#8b5cf6',
    },
  ];

  const toggleInsuranceSelection = (insuranceId: number) => {
    if (selectedInsurance.includes(insuranceId)) {
      setSelectedInsurance(selectedInsurance.filter(id => id !== insuranceId));
    } else {
      if (selectedInsurance.length >= maxSelection) {
        Alert.alert(
          'Maximum Selection Reached',
          `You can only select up to ${maxSelection} insurance types per ticket.`,
          [{ text: 'OK' }]
        );
        return;
      }
      setSelectedInsurance([...selectedInsurance, insuranceId]);
    }
  };

  const getTotalPrice = () => {
    return selectedInsurance.reduce((total, id) => {
      const insurance = insuranceTypes.find(i => i.id === id);
      return total + (insurance?.price || 0);
    }, 0);
  };

  const getTotalCoverage = () => {
    return selectedInsurance.reduce((total, id) => {
      const insurance = insuranceTypes.find(i => i.id === id);
      const coverage = parseInt(insurance?.coverage.replace('$', '').replace(',', '') || '0');
      return total + coverage;
    }, 0);
  };

  const handleProceedToPayment = () => {
    if (selectedInsurance.length === 0) {
      Alert.alert(
        'No Insurance Selected',
        'Please select at least one insurance type to proceed.',
        [{ text: 'OK' }]
      );
      return;
    }
    
    router.push({
      pathname: '/lottery/payment',
      params: {
        selectedNumbers: JSON.stringify(selectedNumbers),
        selectedInsurance: JSON.stringify(selectedInsurance),
        totalPrice: getTotalPrice(),
        totalCoverage: getTotalCoverage(),
      }
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1625', '#2d1b69']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Choose Insurance</Text>
          <View style={styles.placeholder} />
        </View>
        <Text style={styles.headerSubtitle}>
          Select insurance coverage for your lottery numbers
        </Text>
        <View style={styles.selectionCounter}>
          <Text style={styles.counterText}>
            {selectedInsurance.length}/{maxSelection} selected
          </Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Selected Numbers Display */}
        <View style={styles.numbersSection}>
          <Text style={styles.sectionTitle}>Your Lottery Numbers</Text>
          <View style={styles.numbersContainer}>
            {selectedNumbers.map((number: number, index: number) => (
              <View key={index} style={styles.numberDisplay}>
                <Text style={styles.numberText}>{number}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Insurance Types */}
        <View style={styles.insuranceSection}>
          <Text style={styles.sectionTitle}>Insurance Coverage Options</Text>
          {insuranceTypes.map((insurance) => {
            const isSelected = selectedInsurance.includes(insurance.id);
            
            return (
              <TouchableOpacity
                key={insurance.id}
                style={[styles.insuranceCard, isSelected && styles.selectedCard]}
                onPress={() => toggleInsuranceSelection(insurance.id)}
              >
                <View style={styles.cardContent}>
                  <View style={styles.selectionIndicator}>
                    <View style={[styles.checkbox, isSelected && styles.checkedBox]}>
                      {isSelected && <Check size={16} color="#ffffff" />}
                    </View>
                  </View>

                  <View style={styles.insuranceInfo}>
                    <View style={styles.insuranceHeader}>
                      <View style={styles.insuranceTitleRow}>
                        <insurance.icon size={24} color={insurance.color} />
                        <View style={styles.insuranceTitleContainer}>
                          <Text style={styles.insuranceName}>{insurance.name}</Text>
                          <Text style={styles.insuranceDescription}>{insurance.description}</Text>
                        </View>
                      </View>
                      <Text style={styles.insurancePrice}>${insurance.price}</Text>
                    </View>
                    
                    <View style={styles.coverageRow}>
                      <Text style={styles.coverageLabel}>Coverage:</Text>
                      <Text style={styles.coverageAmount}>{insurance.coverage}</Text>
                    </View>
                    
                    <View style={styles.benefitsContainer}>
                      {insurance.benefits.slice(0, 3).map((benefit, index) => (
                        <View key={index} style={styles.benefitItem}>
                          <Check size={12} color={insurance.color} />
                          <Text style={styles.benefitText}>{benefit}</Text>
                        </View>
                      ))}
                      {insurance.benefits.length > 3 && (
                        <Text style={styles.moreBenefits}>+{insurance.benefits.length - 3} more</Text>
                      )}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Summary Footer */}
      <View style={styles.footer}>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Lottery Numbers:</Text>
            <Text style={styles.summaryValue}>{selectedNumbers.length} selected</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Insurance Types:</Text>
            <Text style={styles.summaryValue}>{selectedInsurance.length} selected</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Price:</Text>
            <Text style={styles.summaryValue}>${getTotalPrice()}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Coverage:</Text>
            <Text style={styles.summaryValue}>${getTotalCoverage().toLocaleString()}</Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={[styles.proceedButton, selectedInsurance.length === 0 && styles.disabledButton]}
          onPress={handleProceedToPayment}
          disabled={selectedInsurance.length === 0}
        >
          <LinearGradient
            colors={selectedInsurance.length > 0 ? ['#a855f7', '#7c3aed'] : ['#9ca3af', '#6b7280']}
            style={styles.proceedButtonGradient}
          >
            <Shield size={20} color="#ffffff" />
            <Text style={styles.proceedButtonText}>
              Proceed to Payment ({selectedInsurance.length})
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  placeholder: {
    width: 32,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e2e8f0',
    textAlign: 'center',
    marginBottom: 12,
  },
  selectionCounter: {
    alignItems: 'center',
  },
  counterText: {
    fontSize: 14,
    color: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  numbersSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  numbersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  numberDisplay: {
    backgroundColor: '#7c3aed',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  insuranceSection: {
    gap: 16,
  },
  insuranceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    borderColor: '#a855f7',
    backgroundColor: '#faf5ff',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  selectionIndicator: {
    alignItems: 'center',
    marginTop: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: '#a855f7',
    borderColor: '#a855f7',
  },
  insuranceInfo: {
    flex: 1,
    gap: 12,
  },
  insuranceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  insuranceTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  insuranceTitleContainer: {
    flex: 1,
  },
  insuranceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  insuranceDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  insurancePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7c3aed',
  },
  coverageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coverageLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  coverageAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
  },
  benefitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  benefitText: {
    fontSize: 12,
    color: '#6b7280',
  },
  moreBenefits: {
    fontSize: 12,
    color: '#a855f7',
    fontWeight: '500',
  },
  footer: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    padding: 20,
    gap: 16,
  },
  summaryContainer: {
    gap: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 18,
    color: '#1f2937',
    fontWeight: 'bold',
  },
  proceedButton: {
    borderRadius: 12,
  },
  disabledButton: {
    opacity: 0.5,
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