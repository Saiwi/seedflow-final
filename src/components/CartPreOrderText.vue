<script setup>
defineEmits(["prev"]);
</script>

<template>
    <div class="modal-head">
        <div>
            <i @click="$emit('prev', $event)" class="ri-arrow-left-line"></i>
        </div>
        <div>
            <i class="ri-close-line" @click="$emit('close', $event)"></i>
        </div>
    </div>
    <div class="modal-content">
        <div class="cart-column">
            <h4>
                Замовлення буде зв’язане з даними вказаними у вашому аккаунті
            </h4>
            <p>
                (Ваше Прізвище, Ім’я та номер телефону на який наш менеджер
                зателефонує та повідомить про підтвердження замовлення)
            </p>
            <div class="cart-continue">
                <Button :disabled="false" @click="$emit('next')"
                    >Продовжити</Button
                >
            </div>
        </div>
    </div>
</template>