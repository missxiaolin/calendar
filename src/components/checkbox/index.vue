<template>
    <label class="el-checkbox" @click.stop="handleCheckChange">
        <span class="el-checkbox__input" :class="{'is-checked' : isChecked}">
            <span class="el-checkbox__inner" :style="{'background':color,'border-color':color}"></span>
        </span>
        <span class="el-checkbox__label">
            <slot></slot>
        </span>
    </label>
</template>

<script>
    export default {
        props: {
            color: {
                type: String,
                default: ''
            },
            value: {
                type: Boolean,
            }
        },
        data() {
            return {
                isChecked: false
            }
        },
        watch: {
            value:{
                handler(newValue, oldValue) {
                    console.log('new---->',newValue)
                    this.isChecked = newValue;
                },
                deep: true,
                immediate: true
            }
        },
        methods: {
            handleCheckChange() {
                console.log('点击----》',this.isChecked)
                this.isChecked = !this.isChecked;
                this.$emit('input',this.isChecked)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .el-checkbox__input.is-checked+.el-checkbox__label{color: #606266;}
</style>