<script setup lang="ts">
import { User } from '@/models'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import OneChevronUp from '@/assets/icons/chevron-up.svg'
import OneChevronDown from '@/assets/icons/chevron-down.svg'
import OneBrand from '../OneBrand'
import OneMenu from '../OneMenu'
import { useLink, useRouter } from 'vue-router'

defineOptions({
  name: 'OneNavbar'
})

const client = useQueryClient()

const { data: user } = useQuery({
  queryKey: ['user'],
  queryFn: User.me
})
</script>

<template>
  <div class="h-16 px-6 z-50 fixed flex top-0 left-0 right-0 bg-white border-b border-gray-200">
    <OneBrand></OneBrand>
    <div class="w-[1px] mx-4 my-4 bg-gray-200"></div>
    <div class="flex items-center font-semibold text-xl text-gray-700 tracking-tight">
      Dashboard
    </div>
    <div class="ml-auto flex items-center">
      <slot name="actions">
        <OneMenu
          width="100%"
          :items="[
            {
              key: 'logout',
              label: 'Log Out',
              onClick: () => {
                User.signOut()
                client.clear()
              }
            }
          ]"
        >
          <div class="flex h-16 w-52 items-center flex-shrink-0 cursor-pointer">
            <div class="flex-shrink-0 mr-4">
              <div class="w-9 h-9 bg-gray-200 rounded-full"></div>
            </div>
            <div class="flex-col flex-1">
              <div class="text-sm font-semibold">
                {{ user?.fullName }}
              </div>
              <div class="text-xs text-gray-500">
                {{ user?.email }}
              </div>
            </div>
            <div class="flex-shrink-0">
              <OneChevronUp class="h-5 w-5" viewBox="0 0 24 24"></OneChevronUp>
            </div>
          </div>
        </OneMenu>
      </slot>
    </div>
  </div>
</template>

<style scoped></style>
