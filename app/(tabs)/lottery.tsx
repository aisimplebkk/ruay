import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ticket, Shield, Clock, Star, CircleAlert as AlertCircle, Calendar, Users } from 'lucide-react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function LotteryScreen() {
  const [kycVerified, setKycVerified] = useState(true); // Set to true for demo
  const [currentPeriod, setCurrentPeriod] = useState('1-15 Feb 2025');

  const lotteries = [
    {
      id: 1,
      name: 'Health Guardian',
      jackpot: '$10,000',
      price: '$5',
      insurance: {
        type: 'Health Coverage',
        coverage: '$2,000',
        benefits: ['Emergency medical', 'Hospitalization', 'Prescription drugs'],
      },
      drawDate: '2025-02-15',
      participants: '847',
      odds: '1 in 1,000',
    },
    {
      id: 2,
      name: 'Life Protector',
      jackpot: '$50,000',
      price: '$15',
      insurance: {
        type: 'Life Insurance',
        coverage: '$10,000',
        benefits: ['Death benefit', 'Accidental coverage', 'Terminal illness'],
      },
      drawDate: '2025-02-15',
      participants: '2,341',
      odds: '1 in 10,000',
    },
    {
      id: 3,
      name: 'Property Shield',
      jackpot: '$25,000',
      price: '$10',
      insurance: {
        type: 'Property Insurance',
        coverage: '$5,000',
        benefits: ['Fire damage', 'Theft protection', 'Natural disasters'],
      },
      drawDate: '2025-02-15',
      participants: '1,523',
      odds: '1 in 5,000',
    },
    {
      id: 4,
      name: 'Family Care',
      jackpot: '$75,000',
      price: '$25',
      insurance: {
        type: 'Family Coverage',
        coverage: '$15,000',
        benefits: ['Health + Life', 'Child protection', 'Elderly care'],
      },
      drawDate: '2025-02-15',
      participants: '3,892',
      odds: '1 in 15,000',
    },
    {
      id: 5,
      name: 'Business Guard',
      jackpot: '$100,000',
      price: '$35',
      insurance: {
        type: 'Business Insurance',
        coverage: '$20,000',
        benefits: ['Equipment protection', 'Liability coverage', 'Income loss'],
      },
      drawDate: '2025-02-15',
      participants: '5,234',
      odds: '1 in 25,000',
    },
  ];

  const handleSelectLotteries = () => {
    router.push('/lottery/selection');
  };

  const getDaysUntilDraw = (drawDate: string) => {
    const today = new Date();
    const draw = new Date(drawDate);
    const diffTime = draw.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#1a1625', '#2d1b69']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Buy Lottery + Insurance</Text>
        <Text style={styles.headerSubtitle}>
          Every lottery ticket includes valuable insurance coverage
        </Text>
        
        <View style={styles.periodContainer}>
          <Calendar size={20} color="#ffffff" />
          <Text style={styles.periodText}>Current Period: {currentPeriod}</Text>
        </View>
      </LinearGradient>

      {!kycVerified && (
        <View style={styles.kycAlert}>
          <AlertCircle size={24} color="#f59e0b" />
          <View style={styles.kycAlertText}>
            <Text style={styles.kycAlertTitle}>KYC Verification Required</Text>
            <Text style={styles.kycAlertMessage}>
              Complete identity verification to purchase lottery tickets
            </Text>
          </View>
          <TouchableOpacity style={styles.kycButton}>
            <Text style={styles.kycButtonText}>Verify Now</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How It Works</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              • Select up to 5 lotteries per period (15 days){'\n'}
              • Each ticket includes instant insurance coverage{'\n'}
              • Pay via QR code for secure transactions{'\n'}
              • Coverage starts immediately after payment
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Available Lotteries</Text>
        
        {lotteries.map((lottery) => (
          <View key={lottery.id} style={styles.lotteryContainer}>
            <LinearGradient
              colors={['#ffffff', '#faf5ff']}
              style={styles.lotteryCard}
            >
              {/* Lottery Header */}
              <View style={styles.lotteryHeader}>
                <View style={styles.lotteryInfo}>
                  <Text style={styles.lotteryName}>{lottery.name}</Text>
                  <View style={styles.jackpotContainer}>
                    <Star size={20} color="#fbbf24" />
                    <Text style={styles.jackpotText}>Jackpot: {lottery.jackpot}</Text>
                  </View>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.priceLabel}>Price</Text>
                  <Text style={styles.priceValue}>{lottery.price}</Text>
                </View>
              </View>

              {/* Insurance Section */}
              <View style={styles.insuranceSection}>
                <View style={styles.insuranceHeader}>
                  <Shield size={24} color="#a855f7" />
                  <View style={styles.insuranceInfo}>
                    <Text style={styles.insuranceType}>{lottery.insurance.type}</Text>
                    <Text style={styles.insuranceCoverage}>
                      Coverage up to {lottery.insurance.coverage}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.benefitsList}>
                  {lottery.insurance.benefits.map((benefit, index) => (
                    <View key={index} style={styles.benefitItem}>
                      <View style={styles.benefitDot} />
                      <Text style={styles.benefitText}>{benefit}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Lottery Details */}
              <View style={styles.detailsSection}>
                <View style={styles.detailRow}>
                  <Clock size={16} color="#6b7280" />
                  <Text style={styles.detailText}>
                    Draw in {getDaysUntilDraw(lottery.drawDate)} days
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Users size={16} color="#6b7280" />
                  <Text style={styles.detailText}>
                    {lottery.participants} participants
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Ticket size={16} color="#6b7280" />
                  <Text style={styles.detailText}>Odds: {lottery.odds}</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        ))}

        {/* Selection Button */}
        <TouchableOpacity
          style={[
            styles.selectionButton,
            !kycVerified && styles.selectionButtonDisabled,
          ]}
          onPress={handleSelectLotteries}
          disabled={!kycVerified}
        >
          <LinearGradient
            colors={kycVerified ? ['#a855f7', '#7c3aed'] : ['#9ca3af', '#6b7280']}
            style={styles.selectionButtonGradient}
          >
            <Ticket size={24} color="#ffffff" />
            <Text style={styles.selectionButtonText}>
              {kycVerified ? 'Select Lotteries to Buy' : 'Complete KYC First'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
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
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e2e8f0',
    textAlign: 'center',
    marginBottom: 16,
  },
  periodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  periodText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  kycAlert: {
    backgroundColor: '#fef3c7',
    borderColor: '#f59e0b',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  kycAlertText: {
    flex: 1,
  },
  kycAlertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 4,
  },
  kycAlertMessage: {
    fontSize: 14,
    color: '#b45309',
  },
  kycButton: {
    backgroundColor: '#f59e0b',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  kycButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  content: {
    padding: 20,
    gap: 24,
  },
  infoSection: {
    gap: 12,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  lotteryContainer: {
    marginBottom: 16,
  },
  lotteryCard: {
    borderRadius: 16,
    padding: 20,
    gap: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lotteryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  lotteryInfo: {
    flex: 1,
  },
  lotteryName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  jackpotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  jackpotText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#d97706',
  },
  priceContainer: {
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 12,
  },
  priceLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7c3aed',
  },
  insuranceSection: {
    backgroundColor: '#faf5ff',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  insuranceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  insuranceInfo: {
    flex: 1,
  },
  insuranceType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7c3aed',
  },
  insuranceCoverage: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  benefitsList: {
    gap: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  benefitDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#a855f7',
  },
  benefitText: {
    fontSize: 14,
    color: '#4b5563',
  },
  detailsSection: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6b7280',
  },
  selectionButton: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 20,
  },
  selectionButtonDisabled: {
    opacity: 0.6,
  },
  selectionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  selectionButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});