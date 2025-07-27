import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Camera, Upload, Shield, Check } from 'lucide-react-native';

interface KYCModalProps {
  visible: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export default function KYCModal({ visible, onClose, onComplete }: KYCModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    address: '',
    phoneNumber: '',
    idNumber: '',
  });

  const steps = [
    { number: 1, title: 'Personal Information', completed: false },
    { number: 2, title: 'Identity Verification', completed: false },
    { number: 3, title: 'Address Verification', completed: false },
    { number: 4, title: 'Review & Submit', completed: false },
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Personal Information</Text>
            <Text style={styles.stepDescription}>
              Please provide your basic personal details
            </Text>
            
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  value={formData.fullName}
                  onChangeText={(text) => setFormData({...formData, fullName: text})}
                  placeholder="Enter your full name"
                  placeholderTextColor="#9ca3af"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Date of Birth</Text>
                <TextInput
                  style={styles.input}
                  value={formData.dateOfBirth}
                  onChangeText={(text) => setFormData({...formData, dateOfBirth: text})}
                  placeholder="MM/DD/YYYY"
                  placeholderTextColor="#9ca3af"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  value={formData.phoneNumber}
                  onChangeText={(text) => setFormData({...formData, phoneNumber: text})}
                  placeholder="+1 (555) 123-4567"
                  placeholderTextColor="#9ca3af"
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          </View>
        );
      
      case 2:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Identity Verification</Text>
            <Text style={styles.stepDescription}>
              Upload a clear photo of your government-issued ID
            </Text>
            
            <View style={styles.uploadContainer}>
              <TouchableOpacity style={styles.uploadBox}>
                <Camera size={48} color="#a855f7" />
                <Text style={styles.uploadTitle}>Take Photo</Text>
                <Text style={styles.uploadText}>Use camera to capture ID</Text>
              </TouchableOpacity>
              
              <Text style={styles.orText}>OR</Text>
              
              <TouchableOpacity style={styles.uploadBox}>
                <Upload size={48} color="#a855f7" />
                <Text style={styles.uploadTitle}>Upload File</Text>
                <Text style={styles.uploadText}>Select from gallery</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>ID Number</Text>
              <TextInput
                style={styles.input}
                value={formData.idNumber}
                onChangeText={(text) => setFormData({...formData, idNumber: text})}
                placeholder="Enter ID number"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>
        );
      
      case 3:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Address Verification</Text>
            <Text style={styles.stepDescription}>
              Provide your current address and supporting document
            </Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Complete Address</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.address}
                onChangeText={(text) => setFormData({...formData, address: text})}
                placeholder="Enter your complete address"
                placeholderTextColor="#9ca3af"
                multiline
                numberOfLines={3}
              />
            </View>
            
            <View style={styles.uploadContainer}>
              <TouchableOpacity style={styles.uploadBox}>
                <Upload size={48} color="#a855f7" />
                <Text style={styles.uploadTitle}>Upload Proof</Text>
                <Text style={styles.uploadText}>Utility bill, bank statement, or lease</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      
      case 4:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Review & Submit</Text>
            <Text style={styles.stepDescription}>
              Please review your information before submitting
            </Text>
            
            <View style={styles.reviewContainer}>
              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Full Name:</Text>
                <Text style={styles.reviewValue}>{formData.fullName}</Text>
              </View>
              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Date of Birth:</Text>
                <Text style={styles.reviewValue}>{formData.dateOfBirth}</Text>
              </View>
              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Phone:</Text>
                <Text style={styles.reviewValue}>{formData.phoneNumber}</Text>
              </View>
              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>ID Number:</Text>
                <Text style={styles.reviewValue}>{formData.idNumber}</Text>
              </View>
            </View>
            
            <View style={styles.agreementContainer}>
              <Shield size={24} color="#10b981" />
              <Text style={styles.agreementText}>
                By submitting, you agree to our Terms of Service and Privacy Policy. 
                Your information is encrypted and secure.
              </Text>
            </View>
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <LinearGradient
          colors={['#1a1625', '#2d1b69']}
          style={styles.modalHeader}
        >
          <View style={styles.modalHeaderContent}>
            <Text style={styles.modalTitle}>KYC Verification</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
          
          {/* Progress Steps */}
          <View style={styles.stepsContainer}>
            {steps.map((step) => (
              <View key={step.number} style={styles.stepIndicator}>
                <View style={[
                  styles.stepCircle,
                  currentStep >= step.number && styles.activeStepCircle,
                  currentStep > step.number && styles.completedStepCircle,
                ]}>
                  {currentStep > step.number ? (
                    <Check size={16} color="#ffffff" />
                  ) : (
                    <Text style={[
                      styles.stepNumber,
                      currentStep >= step.number && styles.activeStepNumber,
                    ]}>
                      {step.number}
                    </Text>
                  )}
                </View>
                <Text style={[
                  styles.stepLabel,
                  currentStep >= step.number && styles.activeStepLabel,
                ]}>
                  {step.title}
                </Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
          {renderStepContent()}
        </ScrollView>

        <View style={styles.modalFooter}>
          {currentStep > 1 && (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <LinearGradient
              colors={['#a855f7', '#7c3aed']}
              style={styles.nextButtonGradient}
            >
              <Text style={styles.nextButtonText}>
                {currentStep === 4 ? 'Submit' : 'Next'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  modalHeader: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  modalHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  closeButton: {
    padding: 4,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepIndicator: {
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeStepCircle: {
    backgroundColor: '#a855f7',
  },
  completedStepCircle: {
    backgroundColor: '#10b981',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  activeStepNumber: {
    color: '#ffffff',
  },
  stepLabel: {
    fontSize: 12,
    color: '#e2e8f0',
    textAlign: 'center',
  },
  activeStepLabel: {
    color: '#ffffff',
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  stepContent: {
    gap: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  stepDescription: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
  },
  formContainer: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1f2937',
    backgroundColor: '#ffffff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  uploadContainer: {
    alignItems: 'center',
    gap: 16,
  },
  uploadBox: {
    width: '100%',
    height: 120,
    borderWidth: 2,
    borderColor: '#a855f7',
    borderStyle: 'dashed',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#faf5ff',
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7c3aed',
  },
  uploadText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  orText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '600',
  },
  reviewContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  reviewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  reviewLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  reviewValue: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '600',
  },
  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 16,
  },
  agreementText: {
    flex: 1,
    fontSize: 14,
    color: '#166534',
    lineHeight: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  backButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  nextButton: {
    flex: 2,
  },
  nextButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 12,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});