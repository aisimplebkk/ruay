import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Ticket, Shield, TrendingUp, Award, Clock } from 'lucide-react-native';

export default function HistoryScreen() {
  const [selectedTab, setSelectedTab] = useState<'lottery' | 'insurance'>('lottery');

  const lotteryHistory = [
    {
      id: 1,
      lotteryName: 'Daily Fortune',
      ticketNumber: 'DF-2025-0125',
      purchaseDate: '2025-01-25',
      drawDate: '2025-01-25',
      amount: '$5',
      status: 'Lost',
      winnings: '$0',
      insurance: 'Health Coverage - $2,000',
    },
    {
      id: 2,
      lotteryName: 'Weekly Winner',
      ticketNumber: 'WW-2025-0120',
      purchaseDate: '2025-01-20',
      drawDate: '2025-01-26',
      amount: '$15',
      status: 'Won',
      winnings: '$125',
      insurance: 'Life Insurance - $10,000',
    },
    {
      id: 3,
      lotteryName: 'Daily Fortune',
      ticketNumber: 'DF-2025-0115',
      purchaseDate: '2025-01-15',
      drawDate: 'Pending',
      amount: '$5',
      status: 'Pending',
      winnings: 'TBD',
      insurance: 'Health Coverage - $2,000',
    },
  ];

  const insuranceHistory = [
    {
      id: 1,
      policyType: 'Health Coverage',
      claimAmount: '$450',
      claimDate: '2025-01-22',
      status: 'Approved',
      claimReason: 'Emergency medical treatment',
      payoutDate: '2025-01-24',
      relatedTicket: 'DF-2025-0115',
    },
    {
      id: 2,
      policyType: 'Life Insurance',
      claimAmount: '$0',
      claimDate: '-',
      status: 'No Claims',
      claimReason: '-',
      payoutDate: '-',
      relatedTicket: 'WW-2025-0120',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Won': return '#10b981';
      case 'Lost': return '#ef4444';
      case 'Pending': return '#f59e0b';
      case 'Approved': return '#10b981';
      case 'No Claims': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Won': return <Award size={16} color="#10b981" />;
      case 'Lost': return <Clock size={16} color="#ef4444" />;
      case 'Pending': return <Clock size={16} color="#f59e0b" />;
      case 'Approved': return <Award size={16} color="#10b981" />;
      default: return <Clock size={16} color="#6b7280" />;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#1a1625', '#2d1b69']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Transaction History</Text>
        <Text style={styles.headerSubtitle}>
          Track your lottery tickets and insurance claims
        </Text>
      </LinearGradient>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <TrendingUp size={24} color="#a855f7" />
          <Text style={styles.summaryValue}>$125</Text>
          <Text style={styles.summaryLabel}>Total Winnings</Text>
        </View>
        <View style={styles.summaryCard}>
          <Shield size={24} color="#06b6d4" />
          <Text style={styles.summaryValue}>$450</Text>
          <Text style={styles.summaryLabel}>Claims Paid</Text>
        </View>
        <View style={styles.summaryCard}>
          <Ticket size={24} color="#eab308" />
          <Text style={styles.summaryValue}>3</Text>
          <Text style={styles.summaryLabel}>Tickets Bought</Text>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'lottery' && styles.activeTab]}
          onPress={() => setSelectedTab('lottery')}
        >
          <Ticket size={20} color={selectedTab === 'lottery' ? '#ffffff' : '#6b7280'} />
          <Text style={[styles.tabText, selectedTab === 'lottery' && styles.activeTabText]}>
            Lottery History
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'insurance' && styles.activeTab]}
          onPress={() => setSelectedTab('insurance')}
        >
          <Shield size={20} color={selectedTab === 'insurance' ? '#ffffff' : '#6b7280'} />
          <Text style={[styles.tabText, selectedTab === 'insurance' && styles.activeTabText]}>
            Insurance Claims
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {selectedTab === 'lottery' ? (
          <View style={styles.historyContainer}>
            {lotteryHistory.map((item) => (
              <View key={item.id} style={styles.historyCard}>
                <View style={styles.historyHeader}>
                  <View style={styles.historyInfo}>
                    <Text style={styles.historyTitle}>{item.lotteryName}</Text>
                    <Text style={styles.historySubtitle}>Ticket: {item.ticketNumber}</Text>
                  </View>
                  <View style={styles.statusContainer}>
                    {getStatusIcon(item.status)}
                    <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                      {item.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.historyDetails}>
                  <View style={styles.detailRow}>
                    <Calendar size={16} color="#6b7280" />
                    <Text style={styles.detailText}>
                      Purchased: {new Date(item.purchaseDate).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Clock size={16} color="#6b7280" />
                    <Text style={styles.detailText}>
                      Draw: {item.drawDate === 'Pending' ? 'Pending' : new Date(item.drawDate).toLocaleDateString()}
                    </Text>
                  </View>
                </View>

                <View style={styles.amountContainer}>
                  <View style={styles.amountRow}>
                    <Text style={styles.amountLabel}>Ticket Price:</Text>
                    <Text style={styles.amountValue}>{item.amount}</Text>
                  </View>
                  <View style={styles.amountRow}>
                    <Text style={styles.amountLabel}>Winnings:</Text>
                    <Text style={[
                      styles.amountValue,
                      { color: item.status === 'Won' ? '#10b981' : '#6b7280' }
                    ]}>
                      {item.winnings}
                    </Text>
                  </View>
                </View>

                <View style={styles.insuranceTag}>
                  <Shield size={16} color="#a855f7" />
                  <Text style={styles.insuranceTagText}>{item.insurance}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.historyContainer}>
            {insuranceHistory.map((item) => (
              <View key={item.id} style={styles.historyCard}>
                <View style={styles.historyHeader}>
                  <View style={styles.historyInfo}>
                    <Text style={styles.historyTitle}>{item.policyType}</Text>
                    <Text style={styles.historySubtitle}>
                      Related to: {item.relatedTicket}
                    </Text>
                  </View>
                  <View style={styles.statusContainer}>
                    {getStatusIcon(item.status)}
                    <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                      {item.status}
                    </Text>
                  </View>
                </View>

                {item.status !== 'No Claims' && (
                  <>
                    <View style={styles.historyDetails}>
                      <View style={styles.detailRow}>
                        <Calendar size={16} color="#6b7280" />
                        <Text style={styles.detailText}>
                          Claim Date: {new Date(item.claimDate).toLocaleDateString()}
                        </Text>
                      </View>
                      {item.payoutDate !== '-' && (
                        <View style={styles.detailRow}>
                          <TrendingUp size={16} color="#6b7280" />
                          <Text style={styles.detailText}>
                            Payout: {new Date(item.payoutDate).toLocaleDateString()}
                          </Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.claimInfo}>
                      <Text style={styles.claimReason}>{item.claimReason}</Text>
                      <Text style={styles.claimAmount}>{item.claimAmount}</Text>
                    </View>
                  </>
                )}

                {item.status === 'No Claims' && (
                  <View style={styles.noClaimsInfo}>
                    <Text style={styles.noClaimsText}>
                      No claims filed. Your coverage is active and ready when you need it.
                    </Text>
                  </View>
                )}
              </View>
            ))}
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
  tabContainer: {
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
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#a855f7',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#ffffff',
  },
  content: {
    padding: 20,
  },
  historyContainer: {
    gap: 16,
  },
  historyCard: {
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
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  historySubtitle: {
    fontSize: 14,
    color: '#6b7280',
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
  historyDetails: {
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
  claimInfo: {
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    padding: 12,
    gap: 6,
  },
  claimReason: {
    fontSize: 14,
    color: '#166534',
    fontWeight: '500',
  },
  claimAmount: {
    fontSize: 16,
    color: '#15803d',
    fontWeight: 'bold',
  },
  noClaimsInfo: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
  },
  noClaimsText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});