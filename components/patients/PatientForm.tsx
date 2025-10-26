'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Patient, PatientCreate, GenderOption, BloodTypeOption, StatusOption } from '@/types';
import { ArrowUpTrayIcon, UserIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface PatientFormProps {
    onSave: (patient: PatientCreate) => void;
    existingPatient?: Patient | null;
    isSaving?: boolean;
}

const PatientForm: React.FC<PatientFormProps> = ({ onSave, existingPatient, isSaving }) => {
    const [formData, setFormData] = useState<PatientCreate>({
        fullname: '',
        birthdate: '',
        gender: 'male',
        blood_type: '',
        full_address: '',
        phone: '',
        passport_number: '',
        insurance_number: '',
        status: 'active',
        birth_place: '',
        external_patient_id: '',
        insurance_society_branch_id: null,
        avatar: null,
    });
    
    const [imagePreview, setImagePreview] = useState<string | null>(existingPatient?.avatar || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (existingPatient) {
            setFormData({
                fullname: existingPatient.fullname || '',
                birthdate: existingPatient.birthdate ? existingPatient.birthdate.split('T')[0] : '',
                gender: (existingPatient.gender as GenderOption).value || 'male',
                blood_type: (existingPatient.blood_type as BloodTypeOption).value || '',
                full_address: existingPatient.full_address || '',
                phone: existingPatient.phone || '',
                passport_number: existingPatient.passport_number || '',
                insurance_number: existingPatient.insurance_number || '',
                status: (existingPatient.status as StatusOption).value as 'active' | 'inactive' | 'archived' || 'active',
                birth_place: existingPatient.birth_place || '',
                external_patient_id: existingPatient.external_patient_id?.toString() || '',
                insurance_society_branch_id: existingPatient.insurance_society_branch_id || null,
                avatar: existingPatient.avatar || null,
            });
            setImagePreview(existingPatient.avatar || null);
        }
    }, [existingPatient]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 800 * 1024) {
                alert('حجم الملف كبير جداً. الحجم الأقصى هو 800 كيلوبايت.');
                e.target.value = '';
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadClick = () => fileInputRef.current?.click();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.fullname || !formData.birthdate) {
            alert('يرجى ملء الاسم وتاريخ الميلاد.');
            return;
        }
        
        // إضافة الصورة إلى البيانات المرسلة إذا كانت موجودة
        const patientData = {
            ...formData,
            avatar: imagePreview
        };
        
        onSave(patientData);
    };
    
    const inputClasses = "w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-brand-blue focus:ring-brand-blue dark:border-gray-600 dark:bg-gray-700/50 dark:text-gray-100 dark:placeholder:text-gray-500";
    const labelClasses = "block mb-2 font-semibold text-gray-700 dark:text-gray-300";

    return (
        <div className="rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
            <form id="patient-form" onSubmit={handleSubmit}>
                <div className="mb-10 flex items-center justify-start gap-8 ">
                    <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700">
                        {imagePreview ? (
                            <Image src={imagePreview} alt="معاينة المريض" className="h-full w-full object-cover" width={112} height={112} />
                        ) : (
                            <Image src='/default-avatar.png' alt="معاينة المريض" className="h-full w-full object-cover" width={112} height={112}/>
                        )}
                    </div>
                    <div className="text-right">
                         <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="hidden"
                            accept="image/png, image/jpeg, image/gif"
                        />
                        <button 
                            type="button"
                            onClick={handleUploadClick}
                            className="flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-white shadow transition-colors hover:bg-brand-blue/90"
                        >
                            <ArrowUpTrayIcon className="h-6 w-6" />
                            تحميل صورة
                        </button>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">يسمح بصيغ JPG, GIF و PNG. الحجم الأقصى 800 كيلوبايت</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
                    <div>
                        <label className={labelClasses}>الإسم الكامل</label>
                        <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} className={inputClasses} placeholder="إدخال الاسم الكامل" required />
                    </div>
                    <div>
                        <label className={labelClasses}>تاريخ الميلاد</label>
                         <input
                            type="date"
                            name="birthdate"
                            value={formData.birthdate}
                            onChange={handleChange}
                            className={inputClasses}
                            required
                        />
                    </div>
                     <div>
                        <label className={labelClasses}>مكان الميلاد</label>
                        <input type="text" name="birth_place" value={formData.birth_place} onChange={handleChange} className={inputClasses} placeholder="مثال: الجزائر" />
                    </div>
                    <div>
                        <label className={labelClasses}>إختر زمرة الدم</label>
                        <select name="blood_type" value={formData.blood_type} onChange={handleChange} className={inputClasses}>
                            <option value="">إختر زمرة الدم</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelClasses}>إختر الجنس</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} className={inputClasses}>
                            <option value="male">ذكر</option>
                            <option value="female">أنثى</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelClasses}>العنوان</label>
                        <input type="text" name="full_address" value={formData.full_address} onChange={handleChange} className={inputClasses} placeholder="إدخال العنوان" />
                    </div>
                    <div>
                        <label className={labelClasses}>رقم جواز السفر</label>
                        <input type="text" name="passport_number" value={formData.passport_number ?? ''} onChange={handleChange} className={inputClasses} placeholder="ABC123456" />
                    </div>
                     <div>
                        <label className={labelClasses}>المعرف الخارجي</label>
                        <input type="text" name="external_patient_id" value={formData.external_patient_id ?? ''} onChange={handleChange} className={inputClasses} placeholder="123456789" />
                    </div>
                    <div>
                        <label className={labelClasses}>شركة التأمين</label>
                        <select name="insurance_society_branch_id" value={formData.insurance_society_branch_id === null ? '' : formData.insurance_society_branch_id} onChange={handleChange} className={inputClasses}>
                            <option value="">إختر شركة التأمين</option>
                            <option value="1">شركة السلام</option>
                            <option value="2">شركة النور</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelClasses}>رقم التأمين</label>
                        <input type="text" name="insurance_number" value={formData.insurance_number ?? ''} onChange={handleChange} className={inputClasses} placeholder="INS-12345" />
                    </div>
                    <div>
                        <label className={labelClasses}>رقم الهاتف</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClasses} placeholder="0555123456" />
                    </div>
                     <div>
                        <label className={labelClasses}>الحالة</label>
                        <select name="status" value={formData.status} onChange={handleChange} className={inputClasses}>
                            <option value="active">نشط</option>
                            <option value="inactive">غير نشط</option>
                        </select>
                    </div>
                </div>

                {/* Submit button for edit page header */}
                 <div className="mt-8 text-end">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="rounded-lg bg-brand-blue px-6 py-2.5 text-white shadow transition-colors hover:bg-brand-blue/90 disabled:opacity-50"
                    >
                        {isSaving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PatientForm;
