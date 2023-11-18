<script setup lang="ts">

import { User } from '@/models';
import { useQuery } from '@tanstack/vue-query';
import OneChevronUp from '@/assets/icons/chevron-up.svg'
import OneChevronDown from '@/assets/icons/chevron-down.svg'
import OneMenu from '../OneMenu'
import { useLink, useRouter } from 'vue-router'

defineOptions({
  name: 'OneSidebarAccountBar'
})

const { data: user } = useQuery({
  queryKey: ['user'],
  queryFn: User.me
})
</script>

<template>
  <OneMenu :items="[
    {
      key: 'logout',
      label: 'Log Out',

    }
  ]">
    <div class="flex items-center border-t border-gray-200 shadow-sm flex-shrink-0 px-5 py-4">
      <div class="flex-shrink-0 mr-4">
        <div class="w-9 h-9 bg-gray-200 rounded-lg">

        </div>
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
</template>

<style scoped></style>
