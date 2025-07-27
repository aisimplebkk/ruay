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
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);

  // Mock 10 lottery numbers for demo
  const lotteryNumbers = [
    '123456', '654321', '111222', '234567', '345678',
    '456789', '567890', '678901', '789012', '890123'
  ];

  const handleNumberSelect = (number: string) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== number));
    } else {
      if (selectedNumbers.length >= 5) return;
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#1a1625', '#2d1b69']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>ซื้อสลากกินแบ่ง</Text>
        <Text style={styles.headerSubtitle}>
          เลือกหมายเลข 6 หลักที่คุณชื่นชอบ ราคาสลากละ ฿80
        </Text>
        <View style={styles.periodContainer}>
          <Calendar size={20} color="#ffffff" />
          <Text style={styles.periodText}>งวดปัจจุบัน: {currentPeriod}</Text>
        </View>
      </LinearGradient>

      {!kycVerified && (
        <View style={styles.kycAlert}>
          <AlertCircle size={24} color="#f59e0b" />
          <View style={styles.kycAlertText}>
            <Text style={styles.kycAlertTitle}>ต้องยืนยันตัวตน (KYC)</Text>
            <Text style={styles.kycAlertMessage}>
              กรุณายืนยันตัวตนเพื่อซื้อสลากกินแบ่งรัฐบาล
            </Text>
          </View>
          <TouchableOpacity style={styles.kycButton}>
            <Text style={styles.kycButtonText}>ยืนยันตัวตน</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>หมายเลขสลากที่เปิดขาย</Text>
        <View style={styles.numbersGrid}>
          {lotteryNumbers.map((number) => (
            <TouchableOpacity
              key={number}
              style={[
                styles.lotteryTicketCard,
                selectedNumbers.includes(number) && styles.selectedTicketCard
              ]}
              onPress={() => handleNumberSelect(number)}
              disabled={!kycVerified}
            >
              {/* Left section: Thai logo and text */}
              <View style={styles.ticketLeft}>
                <View style={styles.ticketLogo} />
                <Text style={styles.ticketThaiTitle}>สลากกินแบ่งรัฐบาล</Text>
                <Text style={styles.ticketThaiSub}>THAI GOVERNMENT LOTTERY</Text>
                  </View>
              {/* Center section: number, date, mascot */}
              <View style={styles.ticketCenter}>
                <View style={styles.ticketNumberBox}>
                  <Text style={styles.ticketNumber}>{number}</Text>
                </View>
                <Text style={styles.ticketDate}>1 สิงหาคม 2568</Text>
                <Text style={styles.ticketPrice}>80 บาท</Text>
              </View>
              {/* Right section: red bar with vertical text */}
              <View style={styles.ticketRight}>
                <Text style={styles.ticketBrand}>สลากคุ้ม</Text>
              </View>
            </TouchableOpacity>
          ))}
                </View>
        {selectedNumbers.length > 0 && (
          <View style={styles.selectedContainer}>
            <Text style={styles.selectedTitle}>หมายเลขที่เลือก ({selectedNumbers.length}/5):</Text>
            <View style={styles.selectedNumbers}>
              {selectedNumbers.map((number, idx) => (
                <View key={idx} style={styles.selectedNumber}>
                  <Text style={styles.selectedNumberText}>{number}</Text>
                </View>
              ))}
              </View>
          </View>
        )}
        <TouchableOpacity
          style={[
            styles.selectionButton,
            (!kycVerified || selectedNumbers.length === 0) && styles.selectionButtonDisabled,
          ]}
          onPress={() => {
            router.push({
              pathname: '/lottery/selection',
              params: { selectedNumbers: JSON.stringify(selectedNumbers) }
            });
          }}
          disabled={!kycVerified || selectedNumbers.length === 0}
        >
          <LinearGradient
            colors={kycVerified && selectedNumbers.length > 0 ? ['#a855f7', '#7c3aed'] : ['#9ca3af', '#6b7280']}
            style={styles.selectionButtonGradient}
          >
            <Ticket size={24} color="#ffffff" />
            <Text style={styles.selectionButtonText}>
              {kycVerified ? `ซื้อ (${selectedNumbers.length} ใบ)` : 'กรุณายืนยันตัวตนก่อน'}
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
  numbersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    marginVertical: 16,
  },
  numberButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    width: 90,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  selectedNumberButton: {
    backgroundColor: '#a855f7',
    borderColor: '#a855f7',
  },
  numberText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  selectedNumberText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    flexShrink: 1,
  },
  priceText: {
    fontSize: 14,
    color: '#7c3aed',
    marginTop: 4,
  },
  selectedContainer: {
    backgroundColor: '#faf5ff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e9d5ff',
    marginBottom: 16,
  },
  selectedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7c3aed',
    marginBottom: 8,
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
  lotteryTicketCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    width: 320,
    height: 120,
    margin: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedTicketCard: {
    borderColor: '#a855f7',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  ticketLeft: {
    width: 70,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    backgroundColor: '#f3f4f6',
  },
  ticketLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e11d48',
    marginBottom: 4,
  },
  ticketThaiTitle: {
    fontSize: 12,
    color: '#d7263d',
    fontWeight: 'bold',
  },
  ticketThaiSub: {
    fontSize: 8,
    color: '#555',
    marginBottom: 4,
  },
  ticketCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  ticketNumberBox: {
    backgroundColor: '#fffbe6',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#fbbf24',
    paddingHorizontal: 18,
    paddingVertical: 6,
    marginBottom: 2,
  },
  ticketNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    letterSpacing: 4,
  },
  ticketDate: {
    fontSize: 12,
    color: '#333',
    marginTop: 2,
    marginBottom: 2,
  },
  ticketMascot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ffe066',
    borderWidth: 1,
    borderColor: '#fbbf24',
    marginTop: 2,
    marginBottom: 2,
  },
  ticketPrice: {
    fontSize: 16,
    color: '#d7263d',
    fontWeight: 'bold',
    marginTop: 2,
  },
  ticketRight: {
    width: 36,
    height: '100%',
    backgroundColor: '#a855f7',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ skewY: '-8deg' }],
  },
  ticketBrand: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    writingDirection: 'vertical-rl',
    textAlign: 'center',
  },
});