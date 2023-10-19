<script setup lang="ts">
import OneCard from '@/components/OneCard';
import OnePageContent from '@/components/OnePageContent';
import OnePageHeader from '@/components/OnePageHeader';
import OneSelect from '@/components/OneSelect';
import OnePageFooter from '@/components/OnePageFooter'
import OneButton from '@/components/OneButton'
import OneTextField from '@/components/OneTextField';
import { ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import { User, type UserArgs } from '@/models';
import { SnackbarManager } from '@/components/OneSnackbar';

defineOptions({
  name: 'AddStaffView'
})

const email = ref()
const password = ref()
const firstName = ref()
const lastName = ref()
const role = ref()

const { mutate: create, isLoading, isError } = useMutation({
  mutationFn: async (args: UserArgs) => {
    console.log('creating... ' + args)
    const user = new User(args)

    await user.save()
  }
})

</script>

<template>
  <OnePageHeader class="-mb-12">
    Add Staff
  </OnePageHeader>
  <OnePageContent class="flex flex-col gap-8">
    <OneCard class="px-6 py-8">
      <div class="flex gap-4">
        <div class="w-80 flex-shrink-0">
          <p class=" font-bold tracking-tight">Personal Info</p>
          <p class="text-xs mt-1 text-gray-500">Provide staff personal info</p>
        </div>
        <div class="flex-1 flex flex-col gap-6">
          <OneTextField v-model="email" label="Email" placeholder="Enter email"></OneTextField>
          <OneTextField v-model="password" label="Password" type="password" placeholder="Enter password"></OneTextField>
          <OneTextField v-model="firstName" label="First Name" placeholder="Enter first name"></OneTextField>
          <OneTextField v-model="lastName" label="Last Name" placeholder="Enter last name"></OneTextField>
        </div>
      </div>
      <div class="w-full h-[1px] bg-gray-200 my-10"></div>
      <div class="flex gap-4">
        <div class="w-80 flex-shrink-0">
          <p class=" font-bold tracking-tight">Role</p>
          <p class="text-xs mt-1 text-gray-500">Required for accessing some features</p>
        </div>
        <div class="flex-1 flex flex-col gap-6">
          <OneSelect v-model="role" :items="[{
            label: 'Root',
            value: 'root'
          }, {
            label: 'Staff',
            value: 'staff'
          }]" width="100%"></OneSelect>
        </div>
      </div>
    </OneCard>
  </OnePageContent>
  <OnePageFooter class="flex justify-end">
    <div class="flex justify-end w-full">
      <OneButton class="w-20" :is-loading="isLoading" @click="() => {
        create({ password, email, firstName, lastName, role }, {
          onSuccess: () => {
            SnackbarManager.add({
              title: 'Staff added',
              variant: 'success'
            })
          }
        })

      }">Create</OneButton>
    </div>
  </OnePageFooter>
</template>

<style scoped></style>
