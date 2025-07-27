import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Ticket, Shield, TrendingUp, Award, Clock, CircleCheck as CheckCircle } from 'lucide-react-native';

export default function TrackingScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  const currentPeriod = '1-15 Feb 2025';
  const previousPeriod = '16-31 Jan 2025';

  const currentTickets = [
    {
      id: 1,
      lotteryName: 'Health Guardian',
      ticketNumber: 'HG-2025-0201',
      purchaseDate: '2025-02-01',
      drawDate: '2025-02-15',
      amount: '$5',
      status: 'Active',
      insurance: 'Health Coverage - $2,000',
      qrCode: 'QR123456789',
    },
    {
      id: 2,
      lotteryName: 'Life Protector',
      ticketNumber: 'LP-2025-0203',
      purchaseDate: '2025-02-03',
      drawDate: '2025-02-15',
      amount: '$15',
      status: 'Active',
      insurance: 'Life Insurance - $10,000',
      qrCode: 'QR987654321',
    },
    {
      id: 3,
      lotteryName: 'Property Shield',
      ticketNumber: 'PS-2025-0205',
      purchaseDate: '2025-02-05',
      drawDate: '2025-02-15',
      amount: '$10',
      status: 'Active',
      insurance: 'Property Insurance - $5,000',
      qrCode: 'QR456789123',
    },
  ];

  const previousTickets = [
    {
      id: 4,
      lotteryName: 'Health Guardian',
      ticketNumber: 'HG-2025-0125',
      purchaseDate: '2025-01-25',
      drawDate: '2025-01-31',
      amount: '$5',
      status: 'Lost',
      winnings: '$0',
      insurance: 'Health Coverage - $2,000',
    },
    {
      id: 5,
      lotteryName: 'Life Protector',
      ticketNumber: 'LP-2025-0120',
      purchaseDate: '2025-01-20',
      drawDate: '2025-01-31',
      amount: '$15',
      status: 'Won',
      winnings: '$125',
      insurance: 'Life Insurance - $10,000',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Won': return '#10b981';
      case 'Lost': return '#ef4444';
      case 'Active': return '#a855f7';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Won': return <Award size={16} color="#10b981" />;
      case 'Lost': return <Clock size={16} color="#ef4444" />;
      case 'Active': return <CheckCircle size={16} color="#a855f7" />;
      default: return <Clock size={16} color="#6b7280" />;
    }
  };

  const getDaysUntilDraw = (drawDate: string) => {
    const today = new Date();
    const draw = new Date(drawDate);
    const diffTime = draw.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} days` : 'Draw completed';
  };

  const getTotalCoverage = () => {
    return currentTicketsData.reduce((sum, ticket) => {
      const match = ticket.insurance.match(/\$([\d,]+)/);
      if (match) {
        return sum + parseInt(match[1].replace(/,/g, ''), 10);
      }
      return sum;
    }, 0);
  };

  const currentTicketsData = selectedPeriod === 'current' ? currentTickets : previousTickets;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#1a1625', '#2d1b69']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>My Lottery Tickets</Text>
        <Text style={styles.headerSubtitle}>
          Track your lottery tickets and insurance coverage
        </Text>
      </LinearGradient>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Ticket size={24} color="#a855f7" />
          <Text style={styles.summaryValue}>{currentTickets.length}</Text>
          <Text style={styles.summaryLabel}>Active Tickets</Text>
        </View>
        <View style={styles.summaryCard}>
          <TrendingUp size={24} color="#10b981" />
          <Text style={styles.summaryValue}>$125</Text>
          <Text style={styles.summaryLabel}>Total Winnings</Text>
        </View>
        <View style={styles.summaryCard}>
          <Shield size={24} color="#06b6d4" />
          <Text style={styles.summaryValue}>${getTotalCoverage().toLocaleString()}</Text>
          <Text style={styles.summaryLabel}>Coverage Value</Text>
        </View>
      </View>

      {/* Period Selection */}
      <View style={styles.periodContainer}>
        <TouchableOpacity
          style={[styles.periodTab, selectedPeriod === 'current' && styles.activePeriodTab]}
          onPress={() => setSelectedPeriod('current')}
        >
          <Text style={[styles.periodTabText, selectedPeriod === 'current' && styles.activePeriodTabText]}>
            Current Period
          </Text>
          <Text style={[styles.periodDate, selectedPeriod === 'current' && styles.activePeriodDate]}>
            {currentPeriod}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.periodTab, selectedPeriod === 'previous' && styles.activePeriodTab]}
          onPress={() => setSelectedPeriod('previous')}
        >
          <Text style={[styles.periodTabText, selectedPeriod === 'previous' && styles.activePeriodTabText]}>
            Previous Period
          </Text>
          <Text style={[styles.periodDate, selectedPeriod === 'previous' && styles.activePeriodDate]}>
            {previousPeriod}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {currentTicketsData.length > 0 ? (
          <View style={styles.ticketsContainer}>
            {currentTicketsData.map((ticket) => (
              <View key={ticket.id} style={styles.ticketCard}>
                <View style={styles.ticketHeader}>
                  <View style={styles.ticketInfo}>
                    <Text style={styles.ticketName}>{ticket.lotteryName}</Text>
                    <Text style={styles.ticketNumber}>#{ticket.ticketNumber}</Text>
                  </View>
                  <View style={styles.statusContainer}>
                    {getStatusIcon(ticket.status)}
                    <Text style={[styles.statusText, { color: getStatusColor(ticket.status) }]}>
                      {ticket.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.ticketDetails}>
                  <View style={styles.detailRow}>
                    <Calendar size={16} color="#6b7280" />
                    <Text style={styles.detailText}>
                      Purchased: {new Date(ticket.purchaseDate).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Clock size={16} color="#6b7280" />
                    <Text style={styles.detailText}>
                      Draw: {ticket.status === 'Active' 
                        ? getDaysUntilDraw(ticket.drawDate) 
                        : new Date(ticket.drawDate).toLocaleDateString()}
                    </Text>
                  </View>
                </View>

                <View style={styles.amountContainer}>
                  <View style={styles.amountRow}>
                    <Text style={styles.amountLabel}>Ticket Price:</Text>
                    <Text style={styles.amountValue}>{ticket.amount}</Text>
                  </View>
                  {ticket.status !== 'Active' && (
                    <View style={styles.amountRow}>
                      <Text style={styles.amountLabel}>Winnings:</Text>
                      <Text style={[
                        styles.amountValue,
                        { color: ticket.status === 'Won' ? '#10b981' : '#6b7280' }
                      ]}>
                        {ticket.winnings || '$0'}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.insuranceTag}>
                  <Shield size={16} color="#a855f7" />
                  <Text style={styles.insuranceTagText}>{ticket.insurance}</Text>
                </View>

                {ticket.status === 'Active' && (
                  <View style={styles.countdownContainer}>
                    <Clock size={20} color="#a855f7" />
                    <Text style={styles.countdownText}>
                      Draw in {getDaysUntilDraw(ticket.drawDate)}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ticket size={48} color="#9ca3af" />
            <Text style={styles.emptyTitle}>No Tickets Found</Text>
            <Text style={styles.emptyText}>
              {selectedPeriod === 'current' 
                ? 'You haven\'t purchased any lottery tickets for this period yet.'
                : 'No tickets found for the previous period.'}
            </Text>
            {selectedPeriod === 'current' && (
              <TouchableOpacity style={styles.buyButton}>
                <LinearGradient
                  colors={['#a855f7', '#7c3aed']}
                  style={styles.buyButtonGradient}
                >
                  <Text style={styles.buyButtonText}>Buy Your First Ticket</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
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
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginTop: -15,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  periodContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    margin: 20,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  periodTab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  activePeriodTab: {
    backgroundColor: '#a855f7',
  },
  periodTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 2,
  },
  activePeriodTabText: {
    color: '#ffffff',
  },
  periodDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  activePeriodDate: {
    color: '#e2e8f0',
  },
  content: {
    padding: 20,
  },
  ticketsContainer: {
    gap: 16,
  },
  ticketCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  ticketInfo: {
    flex: 1,
  },
  ticketName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  ticketNumber: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'monospace',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  ticketDetails: {
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
  amountContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
    gap: 6,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  amountValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  insuranceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#faf5ff',
    borderRadius: 8,
    padding: 8,
  },
  insuranceTagText: {
    fontSize: 14,
    color: '#7c3aed',
    fontWeight: '500',
  },
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    padding: 12,
  },
  countdownText: {
    fontSize: 16,
    color: '#0369a1',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    gap: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  buyButton: {
    borderRadius: 12,
    marginTop: 16,
  },
  buyButtonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});