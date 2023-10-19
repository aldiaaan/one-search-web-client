<script setup lang="ts">
import OneCard from '../OneCard'
import OneTextField from '../OneTextField'

defineOptions({
  name: 'UserForm'
})

const props = defineProps<{
  modelValue?: {
    firstName?: string;
    lastName?: string;
    password?: string;
    email?: string;
    role?: string;
  }
}>()

const emits = defineEmits(['update:modelValue'])

</script>

<template>
  <OneCard class="px-6 py-8">
    <div class="flex gap-4">
      <div class="w-80 flex-shrink-0">
        <p class=" font-bold tracking-tight">Personal Info</p>
        <p class="text-xs mt-1 text-gray-500">Provide staff personal info</p>
      </div>
      <div class="flex-1 flex flex-col gap-6">
        <OneTextField label="Email" placeholder="Enter email"></OneTextField>
        <OneTextField label="Password" type="password" placeholder="Enter password"></OneTextField>
        <OneTextField label="First Name" placeholder="Enter first name"></OneTextField>
        <OneTextField label="Last Name" placeholder="Enter last name"></OneTextField>
      </div>
    </div>
    <div class="w-full h-[1px] bg-gray-200 my-10"></div>
    <div class="flex gap-4">
      <div class="w-80 flex-shrink-0">
        <p class=" font-bold tracking-tight">Role</p>
        <p class="text-xs mt-1 text-gray-500">Required for accessing some features</p>
      </div>
      <div class="flex-1 flex flex-col gap-6">
        <OneSelect :items="[{
          label: 'Root',
          value: 'root'
        }, {
          label: 'Staff',
          value: 'staff'
        }]" width="100%"></OneSelect>
      </div>
    </div>
  </OneCard>
</template>