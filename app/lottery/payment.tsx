import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, QrCode, Shield, Ticket, Clock, CircleCheck as CheckCircle, Heart, Chrome as Home, Car, Users } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

export default function PaymentScreen() {
  const params = useLocalSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed'>('pending');
  const [countdown, setCountdown] = useState(600); // 10 minutes in seconds

  const selectedNumbers = JSON.parse(params.selectedNumbers as string || '[]');
  const selectedInsurance = JSON.parse(params.selectedInsurance as string || '[]');
  const totalPrice = params.totalPrice as string;
  const totalCoverage = params.totalCoverage as string;

  const insuranceTypes = [
    {
      id: 1,
      name: 'Health Coverage',
      icon: Heart,
      coverage: '฿2,000',
      price: 10,
      color: '#ef4444',
    },
    {
      id: 2,
      name: 'Life Insurance',
      icon: Shield,
      coverage: '฿10,000',
      price: 10,
      color: '#3b82f6',
    },
    {
      id: 3,
      name: 'Property Protection',
      icon: Home,
      coverage: '฿5,000',
      price: 10,
      color: '#10b981',
    },
    {
      id: 4,
      name: 'Vehicle Insurance',
      icon: Car,
      coverage: '฿15,000',
      price: 10,
      color: '#f59e0b',
    },
    {
      id: 5,
      name: 'Family Coverage',
      icon: Users,
      coverage: '฿15,000',
      price: 10,
      color: '#8b5cf6',
    },
  ];

  const selectedInsuranceData = insuranceTypes.filter(insurance => 
    selectedInsurance.includes(insurance.id)
  );

  // Countdown timer
  useEffect(() => {
    if (paymentStatus === 'pending' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, paymentStatus]);

  // Simulate payment processing
  const simulatePayment = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('completed');
      setTimeout(() => {
        router.replace('/(tabs)/tracking');
      }, 2000);
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (paymentStatus === 'completed') {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#10b981', '#059669']}
          style={styles.successContainer}
        >
          <CheckCircle size={80} color="#ffffff" />
          <Text style={styles.successTitle}>ชำระเงินสำเร็จ!</Text>
          <Text style={styles.successSubtitle}>
            สลากและประกันของคุณเปิดใช้งานแล้ว
          </Text>
          <Text style={styles.redirectText}>
            กำลังนำคุณไปยังหน้าตั๋วของคุณ...
          </Text>
        </LinearGradient>
      </View>
    );
  }

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
          <Text style={styles.headerTitle}>ชำระเงิน</Text>
          <View style={styles.placeholder} />
        </View>
        
        {paymentStatus === 'pending' && (
          <View style={styles.timerContainer}>
            <Clock size={20} color="#ffffff" />
            <Text style={styles.timerText}>
              กรุณาชำระเงินภายใน {formatTime(countdown)}
            </Text>
          </View>
        )}
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Order Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>สรุปรายการสั่งซื้อ</Text>
          <View style={styles.summaryCard}>
            {/* Lottery Numbers */}
            <View style={styles.lotterySection}>
              <Text style={styles.lotteryTitle}>หมายเลขสลาก</Text>
              <View style={styles.numbersContainer}>
                {selectedNumbers.map((number: number, index: number) => (
                  <View key={index} style={styles.numberDisplay}>
                    <Text style={styles.numberText}>{number}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Insurance Coverage */}
            <View style={styles.insuranceSection}>
              <Text style={styles.insuranceTitle}>ความคุ้มครองประกัน</Text>
              {selectedInsuranceData.map((insurance, index) => (
                <View key={insurance.id} style={styles.insuranceItem}>
                  <View style={styles.insuranceInfo}>
                    <View style={styles.insuranceHeader}>
                      <insurance.icon size={20} color={insurance.color} />
                      <Text style={styles.insuranceName}>{insurance.name}</Text>
                    </View>
                    <Text style={styles.insuranceCoverage}>ความคุ้มครอง: {insurance.coverage}</Text>
                  </View>
                  <Text style={styles.insurancePrice}>฿{insurance.price}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>ยอดรวม:</Text>
              <Text style={styles.totalAmount}>฿{totalPrice}</Text>
            </View>
            
            <View style={styles.coverageRow}>
              <Shield size={16} color="#10b981" />
              <Text style={styles.coverageText}>
                ความคุ้มครองประกันรวม: ฿{parseInt(totalCoverage).toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* QR Code Section */}
        <View style={styles.qrSection}>
          <Text style={styles.sectionTitle}>สแกนเพื่อชำระเงิน</Text>
          <View style={styles.qrContainer}>
            {paymentStatus === 'pending' ? (
              <>
                <View style={styles.qrCodePlaceholder}>
                  <QrCode size={120} color="#a855f7" />
                  <Text style={styles.qrText}>QR Code สำหรับชำระเงิน</Text>
                </View>
                <Text style={styles.qrInstructions}>
                  สแกน QR นี้ด้วยแอปธนาคารหรือวอลเล็ตเพื่อชำระเงิน
                </Text>
              </>
            ) : (
              <View style={styles.processingContainer}>
                <View style={styles.processingSpinner} />
                <Text style={styles.processingText}>กำลังดำเนินการชำระเงิน...</Text>
                <Text style={styles.processingSubtext}>
                  กรุณารอสักครู่ ระบบกำลังตรวจสอบการชำระเงินของคุณ
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Payment Methods */}
        {paymentStatus === 'pending' && (
          <View style={styles.methodsSection}>
            <Text style={styles.sectionTitle}>ช่องทางการชำระเงินที่รองรับ</Text>
            <View style={styles.methodsContainer}>
              <View style={styles.methodItem}>
                <Text style={styles.methodText}>• โมบายแบงก์กิ้ง</Text>
              </View>
              <View style={styles.methodItem}>
                <Text style={styles.methodText}>• วอลเล็ตดิจิทัล (เช่น TrueMoney, ShopeePay)</Text>
              </View>
              <View style={styles.methodItem}>
                <Text style={styles.methodText}>• กระเป๋าคริปโต</Text>
              </View>
              <View style={styles.methodItem}>
                <Text style={styles.methodText}>• บริการชำระเงินด้วย QR</Text>
              </View>
            </View>
          </View>
        )}

        {/* Demo Button */}
        {paymentStatus === 'pending' && (
          <TouchableOpacity style={styles.demoButton} onPress={simulatePayment}>
            <LinearGradient
              colors={['#10b981', '#059669']}
              style={styles.demoButtonGradient}
            >
              <Text style={styles.demoButtonText}>จำลองการชำระเงิน (สำหรับทดสอบ)</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </ScrollView>
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
    marginBottom: 16,
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
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  timerText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  summarySection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lotterySection: {
    gap: 12,
  },
  lotteryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
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
    gap: 12,
  },
  insuranceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  insuranceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  insuranceInfo: {
    flex: 1,
  },
  insuranceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  insuranceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  insuranceCoverage: {
    fontSize: 14,
    color: '#7c3aed',
  },
  insurancePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 2,
    borderTopColor: '#e5e7eb',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#a855f7',
  },
  coverageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    padding: 12,
  },
  coverageText: {
    fontSize: 14,
    color: '#166534',
    fontWeight: '600',
  },
  qrSection: {
    marginBottom: 24,
  },
  qrContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  qrCodePlaceholder: {
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  qrText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  qrInstructions: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  processingContainer: {
    alignItems: 'center',
    gap: 16,
  },
  processingSpinner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#e5e7eb',
    borderTopColor: '#a855f7',
  },
  processingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  processingSubtext: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  methodsSection: {
    marginBottom: 24,
  },
  methodsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  methodItem: {
    paddingVertical: 4,
  },
  methodText: {
    fontSize: 14,
    color: '#4b5563',
  },
  demoButton: {
    borderRadius: 12,
    marginBottom: 20,
  },
  demoButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 12,
  },
  demoButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    padding: 40,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 24,
  },
  redirectText: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
  },
});