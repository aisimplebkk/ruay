import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Shield, Heart, Chrome as Home, Car, CircleCheck as CheckCircle, Clock, TriangleAlert as AlertTriangle } from 'lucide-react-native';

export default function InsuranceScreen() {
  const [selectedTab, setSelectedTab] = useState<'active' | 'available'>('active');

  const activePolicies = [
    {
      id: 1,
      type: 'Health Coverage',
      coverage: '$2,000',
      status: 'Active',
      expiryDate: '2025-03-15',
      purchaseDate: '2025-01-15',
      lotteryTicket: 'Daily Fortune #DF-2025-0115',
      benefits: ['Emergency medical', 'Hospitalization', 'Prescription drugs'],
      claimsUsed: 0,
      maxClaims: 3,
    },
    {
      id: 2,
      type: 'Life Insurance',
      coverage: '$10,000',
      status: 'Active',
      expiryDate: '2025-02-20',
      purchaseDate: '2025-01-20',
      lotteryTicket: 'Weekly Winner #WW-2025-0120',
      benefits: ['Death benefit', 'Accidental coverage', 'Terminal illness'],
      claimsUsed: 0,
      maxClaims: 1,
    },
  ];

  const availableInsurance = [
    {
      type: 'Property Protection',
      coverage: '$5,000',
      icon: Home,
      description: 'Protect your home and belongings',
      benefits: ['Fire damage', 'Theft protection', 'Natural disasters'],
      monthlyEquivalent: '$25',
    },
    {
      type: 'Vehicle Insurance',
      coverage: '$15,000',
      icon: Car,
      description: 'Comprehensive vehicle coverage',
      benefits: ['Collision coverage', 'Theft protection', 'Third-party liability'],
      monthlyEquivalent: '$45',
    },
    {
      type: 'Critical Illness',
      coverage: '$8,000',
      icon: Heart,
      description: 'Coverage for serious health conditions',
      benefits: ['Cancer treatment', 'Heart disease', 'Stroke coverage'],
      monthlyEquivalent: '$35',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#1a1625', '#2d1b69']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Insurance Coverage</Text>
        <Text style={styles.headerSubtitle}>
          Manage your insurance policies and protection
        </Text>
      </LinearGradient>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'active' && styles.activeTab]}
          onPress={() => setSelectedTab('active')}
        >
          <Text style={[styles.tabText, selectedTab === 'active' && styles.activeTabText]}>
            Active Policies
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'available' && styles.activeTab]}
          onPress={() => setSelectedTab('available')}
        >
          <Text style={[styles.tabText, selectedTab === 'available' && styles.activeTabText]}>
            Available Coverage
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {selectedTab === 'active' ? (
          <View style={styles.activePoliciesContainer}>
            {activePolicies.length > 0 ? (
              activePolicies.map((policy) => (
                <View key={policy.id} style={styles.policyCard}>
                  <View style={styles.policyHeader}>
                    <View style={styles.policyInfo}>
                      <Text style={styles.policyType}>{policy.type}</Text>
                      <Text style={styles.policyCoverage}>Coverage: {policy.coverage}</Text>
                    </View>
                    <View style={styles.statusBadge}>
                      <CheckCircle size={16} color="#10b981" />
                      <Text style={styles.statusText}>{policy.status}</Text>
                    </View>
                  </View>

                  <View style={styles.policyDetails}>
                    <View style={styles.detailRow}>
                      <Clock size={16} color="#6b7280" />
                      <Text style={styles.detailText}>
                        Expires: {new Date(policy.expiryDate).toLocaleDateString()}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Shield size={16} color="#6b7280" />
                      <Text style={styles.detailText}>
                        Claims used: {policy.claimsUsed}/{policy.maxClaims}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.benefitsSection}>
                    <Text style={styles.benefitsTitle}>Covered Benefits:</Text>
                    <View style={styles.benefitsList}>
                      {policy.benefits.map((benefit, index) => (
                        <View key={index} style={styles.benefitItem}>
                          <CheckCircle size={14} color="#10b981" />
                          <Text style={styles.benefitText}>{benefit}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View style={styles.lotteryInfo}>
                    <Text style={styles.lotteryLabel}>Purchased with:</Text>
                    <Text style={styles.lotteryTicket}>{policy.lotteryTicket}</Text>
                  </View>

                  <TouchableOpacity style={styles.claimButton}>
                    <Text style={styles.claimButtonText}>File a Claim</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Shield size={48} color="#9ca3af" />
                <Text style={styles.emptyTitle}>No Active Policies</Text>
                <Text style={styles.emptyText}>
                  Purchase a lottery ticket to get instant insurance coverage
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.availableContainer}>
            <Text style={styles.availableTitle}>Get More Protection</Text>
            <Text style={styles.availableSubtitle}>
              Purchase lottery tickets to unlock these insurance coverages
            </Text>
            
            {availableInsurance.map((insurance, index) => (
              <View key={index} style={styles.availableCard}>
                <View style={styles.availableHeader}>
                  <insurance.icon size={32} color="#a855f7" />
                  <View style={styles.availableInfo}>
                    <Text style={styles.availableType}>{insurance.type}</Text>
                    <Text style={styles.availableDescription}>{insurance.description}</Text>
                  </View>
                  <View style={styles.availableCoverage}>
                    <Text style={styles.coverageAmount}>{insurance.coverage}</Text>
                    <Text style={styles.coverageLabel}>Coverage</Text>
                  </View>
                </View>

                <View style={styles.availableBenefits}>
                  {insurance.benefits.map((benefit, bIndex) => (
                    <View key={bIndex} style={styles.availableBenefit}>
                      <CheckCircle size={14} color="#a855f7" />
                      <Text style={styles.availableBenefitText}>{benefit}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.comparisonRow}>
                  <View style={styles.comparisonItem}>
                    <Text style={styles.comparisonLabel}>Traditional Insurance</Text>
                    <Text style={styles.comparisonValue}>{insurance.monthlyEquivalent}/month</Text>
                  </View>
                  <View style={styles.comparisonDivider} />
                  <View style={styles.comparisonItem}>
                    <Text style={styles.comparisonLabel}>With Lottery Bundle</Text>
                    <Text style={styles.comparisonHighlight}>Included!</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.exploreButton}>
                  <Text style={styles.exploreButtonText}>View Lottery Options</Text>
                </TouchableOpacity>
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
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#a855f7',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#ffffff',
  },
  content: {
    padding: 20,
  },
  activePoliciesContainer: {
    gap: 20,
  },
  policyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  policyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  policyInfo: {
    flex: 1,
  },
  policyType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  policyCoverage: {
    fontSize: 16,
    color: '#7c3aed',
    fontWeight: '600',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#d1fae5',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#065f46',
    fontWeight: '600',
  },
  policyDetails: {
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
  benefitsSection: {
    gap: 8,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  benefitsList: {
    gap: 6,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  benefitText: {
    fontSize: 14,
    color: '#4b5563',
  },
  lotteryInfo: {
    backgroundColor: '#faf5ff',
    borderRadius: 8,
    padding: 12,
  },
  lotteryLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  lotteryTicket: {
    fontSize: 14,
    color: '#7c3aed',
    fontWeight: '600',
  },
  claimButton: {
    backgroundColor: '#dc2626',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  claimButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
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
  },
  availableContainer: {
    gap: 20,
  },
  availableTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  availableSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
    marginBottom: 20,
  },
  availableCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  availableHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  availableInfo: {
    flex: 1,
  },
  availableType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  availableDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  availableCoverage: {
    alignItems: 'center',
  },
  coverageAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#a855f7',
  },
  coverageLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  availableBenefits: {
    gap: 8,
  },
  availableBenefit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  availableBenefitText: {
    fontSize: 14,
    color: '#4b5563',
  },
  comparisonRow: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  comparisonItem: {
    flex: 1,
    alignItems: 'center',
  },
  comparisonDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 12,
  },
  comparisonLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  comparisonValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  comparisonHighlight: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10b981',
  },
  exploreButton: {
    backgroundColor: '#faf5ff',
    borderColor: '#a855f7',
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  exploreButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7c3aed',
  },
});