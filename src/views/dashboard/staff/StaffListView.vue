<script setup lang="ts">
import OnePageHeader from '@/components/OnePageHeader'
import OneTable from '@/components/OneTable'
import OneTablePagination from '@/components/OneTablePagination'
import OneIconButton from '@/components/OneIconButton'
import OneButton from '@/components/OneButton'
import SearchIcon from '@/assets/icons/search.svg'
import OneMenu from '@/components/OneMenu'
import OnePageContent from '@/components/OnePageContent'
import OneCard from '@/components/OneCard'
import OneSelect from '@/components/OneSelect'
import MoreVerticalIcon from '@/assets/icons/more-vertical.svg'
import { useQueryOptions } from '@/composables';
import { Pagination, User } from '@/models';
import { useQuery, useMutation } from '@tanstack/vue-query';
import OneTextField from '@/components/OneTextField'
import { useRouter } from 'vue-router'
import { SnackbarManager } from '@/components/OneSnackbar'

const headers = [
  {
    key: 'id',
    title: 'ID',
    width: 80
  },
  {
    key: 'email',
    title: 'Email'
  },
  {
    key: 'fullName',
    title: 'Full Name'
  },
  {
    key: 'role',
    title: 'Role'
  },
  {
    key: 'actions',
    title: '',
    width: 100
  }
]

const { page, perPage, query } = useQueryOptions({
  perPage: 10
})

const router = useRouter()

const { data, isLoading, isError, refetch } = useQuery({
  queryKey: [page, query, perPage],
  queryFn: () => User.find({
    page: page.value,
    perPage: perPage.value,
    query: query.value
  })
})

const { mutate: remove } = useMutation({
  mutationFn: async (id?: string) => {
    if (id) {
      await new User({
        id
      }).delete()
    }
  }
})

</script>

<template>
  <!-- <div class="border-b bg-white border-gray-200">
    <OnePageHeader>Staff</OnePageHeader>
  </div> -->
  <OnePageContent>
    <OneCard>
      <div class="py-3 flex gap-3 items-center justify-between px-3 border-b border-gray-200">
        <div class="ml-2">
          <p class="font-semibold text-lg tracking-tight">Staff</p>
        </div>
        <OneButton @click="() => router.push({
          path: '/dashboard/staff/add'
        })" class="h-9">Create New Staff</OneButton>
      </div>
      <div class="py-3 flex gap-3 justify-end px-3 border-b border-gray-200">
        <div class="w-60">
          <form @submit.prevent="() => { }">
            <OneTextField v-model="query" class="h-9" placeholder="Search">
              <template #icon>
                <SearchIcon viewBox="0 0 24 24" class="w-4 h-4 text-gray-500" />
              </template>
            </OneTextField>
          </form>
        </div>
        <OneSelect :items="[{
          value: 5,
          label: '5'
        }, {
          value: 10,
          label: '10'
        }, {
          value: 25,
          label: '25'
        }]" v-model="perPage">
          <template #button="{ selected }">
            <OneButton class="bg-white border border-gray-200 h-9 !text-gray-500">
              Per Page: <span class="text-gray-900 font-semibold ml-1">{{ selected }}</span>
            </OneButton>
          </template>
        </OneSelect>
      </div>
      <OneTable :is-loading="isLoading" :items="data?.users" :headers="headers">
        <template #actions="{ item }">
          <OneMenu :items="[{
            key: 'delete',
            label: 'Delete',
            onClick: () => {

              const x = SnackbarManager.add({
                title: `Removing staff with id ${item.id}...`,
                duration: 9000000000
              })
              remove(item.id, {
                onError: () => {
                  SnackbarManager.add({
                    title: 'Something went wrong, please try again.',
                    variant: 'danger'
                  })
                }, onSettled: () => {
                  SnackbarManager.remove({
                    id: x
                  })
                },
                onSuccess: () => {

                  SnackbarManager.add({
                    title: 'Staff successfully deleted',
                    variant: 'success'
                  })
                  refetch()
                }
              })
            },
          }]">
            <OneIconButton>
              <MoreVerticalIcon class="h-4 w-4 text-gray-700" viewBox="0 0 24 24"></MoreVerticalIcon>
            </OneIconButton>
          </OneMenu>
        </template>
      </OneTable>
      <div class="px-6 py-4 flex justify-end">
        <OneTablePagination v-model="page" :per-page="perPage" :total="data?.pagination.total" />

      </div>
    </OneCard>
  </OnePageContent>
</template>

<style scoped></style>
