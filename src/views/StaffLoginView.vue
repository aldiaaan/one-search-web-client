<script setup lang="ts">
import { ref } from 'vue'
import OneTextField from '@/components/OneTextField';
import OneButton from '@/components/OneButton';
import OneBrand from '@/components/OneBrand';
import oneLogo from '@/assets/one-search-engine.png'
import { useRouter } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';
import { User } from '@/models';

const email = ref("");
const password = ref("");
const router = useRouter()

const { mutate: signin, isLoading: isLoadingSignIn } = useMutation({
  mutationFn: async (user: User) => {
    await user.signin()
    router.push({
      path: '/dashboard'
    })
  }
})

function handleSubmit() {
  signin(new User({ email: email.value, password: password.value }))
}

</script>

<template>
  <div class="h-screen">
    <form @submit.prevent="handleSubmit"
      class="container w-[420px] mx-auto sm:px-0 pt-16 px-8 py-4">
      <OneBrand class="mb-12">
      </OneBrand>
      <div class="mb-10">
        <p class="text-xl text-gray-900 tracking-tighter font-semibold">Sign in</p>
        <p class="text-gray-500 mt-2 text-sm">Please sign in using your staff account</p>
      </div>
      <div class="mb-5">
        <OneTextField v-model="email" label="email" placeholder="Enter your email" />
      </div>
      <div class="mb-6">
        <OneTextField type="password" v-model="password" label="password" placeholder="Enter your password" />
      </div>

      <div class="flex justify-between items-center w-full mb-6">
      </div>
      <OneButton :is-loading="isLoadingSignIn" :full-width="true">Sign In</OneButton>
    </form>
  </div>
</template>

<style scoped></style>
